import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Video, Template, AIProcess, Platform, Analytics } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppState {
  user: User | null;
  videos: Video[];
  templates: Template[];
  aiProcesses: AIProcess[];
  platforms: Platform[];
  analytics: Analytics;
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_VIDEO'; payload: Video }
  | { type: 'UPDATE_VIDEO'; payload: { id: string; updates: Partial<Video> } }
  | { type: 'DELETE_VIDEO'; payload: string }
  | { type: 'ADD_AI_PROCESS'; payload: AIProcess }
  | { type: 'UPDATE_AI_PROCESS'; payload: { id: string; updates: Partial<AIProcess> } }
  | { type: 'TOGGLE_PLATFORM'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_DATA'; payload: Partial<AppState> };

const initialState: AppState = {
  user: null,
  videos: [],
  templates: [
    {
      id: '1',
      title: 'Viral Transition Pack',
      category: 'trending',
      thumbnail: 'gradient-1',
      likes: 2500,
      downloads: 1200,
      isNew: true,
      isPro: false,
      description: 'Smooth transitions for viral content',
      tags: ['transition', 'viral', 'trending']
    },
    {
      id: '2',
      title: 'Business Intro Set',
      category: 'business',
      thumbnail: 'gradient-2',
      likes: 1800,
      downloads: 890,
      isNew: false,
      isPro: true,
      description: 'Professional business introductions',
      tags: ['business', 'professional', 'intro']
    },
    {
      id: '3',
      title: 'Lifestyle Aesthetic',
      category: 'lifestyle',
      thumbnail: 'gradient-3',
      likes: 3200,
      downloads: 1500,
      isNew: true,
      isPro: false,
      description: 'Beautiful lifestyle content templates',
      tags: ['lifestyle', 'aesthetic', 'beauty']
    }
  ],
  aiProcesses: [],
  platforms: [
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '🎵',
      color: 'from-[#67c50a] to-[#7cd7c2]',
      connected: false,
      followers: '0',
      engagement: '0%'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      color: 'from-[#ffd900] to-[#67c50a]',
      connected: false,
      followers: '0',
      engagement: '0%'
    },
    {
      id: 'youtube',
      name: 'YouTube Shorts',
      icon: '▶️',
      color: 'from-[#7cd7c2] to-[#054e6f]',
      connected: false,
      followers: '0',
      engagement: '0%'
    }
  ],
  analytics: {
    totalViews: 0,
    totalEngagement: 0,
    totalShares: 0,
    totalDownloads: 0,
    viewsChange: '+0%',
    engagementChange: '+0%',
    sharesChange: '+0%',
    downloadsChange: '+0%',
    topVideos: [],
    platformStats: []
  },
  isLoading: false,
  error: null
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_VIDEO':
      return { ...state, videos: [...state.videos, action.payload] };
    
    case 'UPDATE_VIDEO':
      return {
        ...state,
        videos: state.videos.map(video =>
          video.id === action.payload.id
            ? { ...video, ...action.payload.updates }
            : video
        )
      };
    
    case 'DELETE_VIDEO':
      return {
        ...state,
        videos: state.videos.filter(video => video.id !== action.payload)
      };
    
    case 'ADD_AI_PROCESS':
      return { ...state, aiProcesses: [...state.aiProcesses, action.payload] };
    
    case 'UPDATE_AI_PROCESS':
      return {
        ...state,
        aiProcesses: state.aiProcesses.map(process =>
          process.id === action.payload.id
            ? { ...process, ...action.payload.updates }
            : process
        )
      };
    
    case 'TOGGLE_PLATFORM':
      return {
        ...state,
        platforms: state.platforms.map(platform =>
          platform.id === action.payload
            ? { ...platform, connected: !platform.connected }
            : platform
        )
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [persistedData, setPersistedData] = useLocalStorage('thereelsapp-data', {});

  // Load persisted data on mount
  useEffect(() => {
    if (persistedData && Object.keys(persistedData).length > 0) {
      dispatch({ type: 'LOAD_DATA', payload: persistedData });
    }
  }, []);

  // Persist data changes
  useEffect(() => {
    const dataToSave = {
      user: state.user,
      videos: state.videos,
      aiProcesses: state.aiProcesses,
      platforms: state.platforms,
      analytics: state.analytics
    };
    setPersistedData(dataToSave);
  }, [state.user, state.videos, state.aiProcesses, state.platforms, state.analytics, setPersistedData]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}