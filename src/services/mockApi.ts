import { User, Video, AIProcess } from '../types';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Authentication
  async login(email: string, password: string): Promise<User> {
    await delay(1000);
    
    // Mock validation
    if (email === 'demo@thereelsapp.com' && password === 'demo123') {
      return {
        id: '1',
        fullName: 'Alex Rodriguez',
        email: email,
        plan: 'pro',
        createdAt: new Date().toISOString(),
        stats: {
          totalViews: 2400000,
          videosCreated: 156,
          engagementRate: 6.8,
          daysActive: 89
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },

  async signup(fullName: string, email: string, password: string): Promise<User> {
    await delay(1200);
    
    return {
      id: Date.now().toString(),
      fullName,
      email,
      plan: 'free',
      createdAt: new Date().toISOString(),
      stats: {
        totalViews: 0,
        videosCreated: 0,
        engagementRate: 0,
        daysActive: 1
      }
    };
  },

  // Video processing
  async uploadVideo(file: File): Promise<Video> {
    await delay(2000);
    
    return {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, ''),
      thumbnail: `gradient-${Math.floor(Math.random() * 6) + 1}`,
      duration: Math.floor(Math.random() * 300) + 30,
      views: 0,
      likes: 0,
      shares: 0,
      platform: [],
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  // AI Processing
  async processWithAI(videoId: string, tool: string): Promise<AIProcess> {
    await delay(500);
    
    const process: AIProcess = {
      id: Date.now().toString(),
      title: `Video ${videoId.slice(-4)}`,
      tool,
      status: 'processing',
      progress: 0,
      createdAt: new Date().toISOString()
    };

    // Simulate progress updates
    setTimeout(() => {
      // This would normally be handled by WebSocket or polling
      console.log('AI processing started for:', tool);
    }, 1000);

    return process;
  },

  // Platform connection
  async connectPlatform(platformId: string): Promise<{ success: boolean; followers?: string }> {
    await delay(1500);
    
    const mockFollowers = {
      tiktok: '45.2K',
      instagram: '32.1K',
      youtube: '12.8K',
      twitter: '8.9K'
    };

    return {
      success: true,
      followers: mockFollowers[platformId as keyof typeof mockFollowers] || '1K'
    };
  },

  // Analytics
  async getAnalytics(): Promise<any> {
    await delay(800);
    
    return {
      totalViews: 2400000,
      totalEngagement: 156000,
      totalShares: 45000,
      totalDownloads: 89000,
      viewsChange: '+12.5%',
      engagementChange: '+8.2%',
      sharesChange: '+15.3%',
      downloadsChange: '+22.1%',
      topVideos: [
        { title: 'Summer Vibes Tutorial', views: '450K', engagement: '92%', platform: 'TikTok' },
        { title: 'AI Magic Reveal', views: '380K', engagement: '88%', platform: 'Instagram' },
        { title: 'Quick Edit Tips', views: '290K', engagement: '85%', platform: 'YouTube' }
      ],
      platformStats: [
        { platform: 'TikTok', views: '1.2M', color: 'from-[#67c50a] to-[#7cd7c2]' },
        { platform: 'Instagram', views: '890K', color: 'from-[#ffd900] to-[#67c50a]' },
        { platform: 'YouTube', views: '310K', color: 'from-[#7cd7c2] to-[#054e6f]' }
      ]
    };
  }
};