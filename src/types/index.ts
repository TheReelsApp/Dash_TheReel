export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
  stats: {
    totalViews: number;
    videosCreated: number;
    engagementRate: number;
    daysActive: number;
  };
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  views: number;
  likes: number;
  shares: number;
  platform: string[];
  status: 'draft' | 'processing' | 'published' | 'scheduled';
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  likes: number;
  downloads: number;
  isNew: boolean;
  isPro: boolean;
  description: string;
  tags: string[];
}

export interface AIProcess {
  id: string;
  title: string;
  tool: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  followers: string;
  engagement: string;
  lastPost?: string;
}

export interface Analytics {
  totalViews: number;
  totalEngagement: number;
  totalShares: number;
  totalDownloads: number;
  viewsChange: string;
  engagementChange: string;
  sharesChange: string;
  downloadsChange: string;
  topVideos: Array<{
    title: string;
    views: string;
    engagement: string;
    platform: string;
  }>;
  platformStats: Array<{
    platform: string;
    views: string;
    color: string;
  }>;
}