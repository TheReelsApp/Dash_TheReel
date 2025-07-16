import React, { useState } from 'react';
import { Share2, Youtube, Instagram, Twitter, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';

export const Distribution: React.FC = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const { state, dispatch } = useApp();

  const handleConnectPlatform = async (platformId: string) => {
    try {
      const result = await mockApi.connectPlatform(platformId);
      if (result.success) {
        dispatch({ type: 'TOGGLE_PLATFORM', payload: platformId });
        // Update followers count if provided
        // This would normally update the platform data in state
      }
    } catch (error) {
      console.error('Failed to connect platform:', error);
    }
  };

  const scheduledPosts = [
    {
      id: 1,
      title: 'Summer Vibes Tutorial',
      platforms: ['tiktok', 'instagram'],
      scheduledTime: '2024-01-15 2:00 PM',
      status: 'scheduled',
      thumbnail: 'gradient-1'
    },
    {
      id: 2,
      title: 'Quick Edit Tips',
      platforms: ['youtube'],
      scheduledTime: '2024-01-16 10:00 AM',
      status: 'published',
      thumbnail: 'gradient-2'
    },
    {
      id: 3,
      title: 'Trending Sound Mix',
      platforms: ['tiktok', 'instagram', 'youtube'],
      scheduledTime: '2024-01-17 6:00 PM',
      status: 'scheduled',
      thumbnail: 'gradient-3'
    }
  ];

  const getGradientClass = (thumbnail: string) => {
    const gradients = {
      'gradient-1': 'from-[#67c50a] to-[#7cd7c2]',
      'gradient-2': 'from-[#ffd900] to-[#67c50a]',
      'gradient-3': 'from-[#7cd7c2] to-[#054e6f]'
    };
    return gradients[thumbnail as keyof typeof gradients] || 'from-[#67c50a] to-[#7cd7c2]';
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Share2 className="w-8 h-8 mr-3 text-[#67c50a]" />
            Distribution
          </h1>
          <p className="text-gray-400 mt-1">Publish and schedule content across all platforms</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white rounded-xl hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300 font-medium">
          Quick Publish
        </button>
      </div>

      {/* Platform Connections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {state.platforms.map((platform) => (
          <div key={platform.id} className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center text-xl`}>
                {platform.icon}
              </div>
              <div className={`
                px-2 py-1 rounded-lg text-xs font-medium
                ${platform.connected ? 'bg-[#67c50a] text-white' : 'bg-white/10 text-gray-400'}
              `}>
                {platform.connected ? 'Connected' : 'Disconnected'}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{platform.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Followers</span>
                <span className="text-white font-medium">{platform.followers}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Engagement</span>
                <span className="text-[#67c50a] font-medium">{platform.engagement}</span>
              </div>
            </div>
            
            <button className={`
              w-full py-2 rounded-xl transition-all duration-300 text-sm font-medium
              ${platform.connected 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white hover:from-[#7cd7c2] hover:to-[#67c50a]'
              }
            `}
            onClick={() => handleConnectPlatform(platform.id)}
            >
              {platform.connected ? 'Manage' : 'Connect'}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Posts */}
        <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Scheduled Posts</h3>
            <Clock className="w-5 h-5 text-[#67c50a]" />
          </div>
          
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className={`w-12 h-8 rounded-lg bg-gradient-to-r ${getGradientClass(post.thumbnail)}`}></div>
                
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white mb-1">{post.title}</h4>
                  <div className="flex items-center space-x-2 mb-1">
                    {post.platforms.map(platformId => {
                      const platform = platforms.find(p => p.id === platformId);
                      return (
                        <span key={platformId} className="text-xs text-gray-400">
                          {platform?.icon}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-400">{post.scheduledTime}</p>
                </div>
                
                <div className="flex items-center">
                  {post.status === 'published' ? (
                    <CheckCircle className="w-5 h-5 text-[#67c50a]" />
                  ) : (
                    <Clock className="w-5 h-5 text-[#ffd900]" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white rounded-xl hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300 font-medium">
            Schedule New Post
          </button>
        </div>

        {/* Performance Overview */}
        <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
            <TrendingUp className="w-5 h-5 text-[#67c50a]" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Reach</span>
              <span className="text-white font-medium">2.4M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Engagement Rate</span>
              <span className="text-[#67c50a] font-medium">6.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Posts This Month</span>
              <span className="text-white font-medium">24</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-[#67c50a]/10 to-[#7cd7c2]/10 rounded-xl">
            <h4 className="text-sm font-medium text-white mb-2">Best Posting Times</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">TikTok</span>
                <span className="text-white">2-4 PM, 7-9 PM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Instagram</span>
                <span className="text-white">11 AM-1 PM, 5-7 PM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">YouTube</span>
                <span className="text-white">12-3 PM, 6-9 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Platform Publisher */}
      <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Cross-Platform Publisher</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Select Platforms</h4>
            <div className="grid grid-cols-2 gap-3">
              {state.platforms.filter(p => p.connected).map(platform => (
                <label key={platform.id} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform.id)}
                    onChange={() => togglePlatform(platform.id)}
                    className="rounded border-gray-300 text-[#67c50a] focus:ring-[#67c50a]"
                  />
                  <span className="text-lg">{platform.icon}</span>
                  <span className="text-sm text-white">{platform.name}</span>
                </label>
              ))}
              {state.platforms.filter(p => p.connected).length === 0 && (
                <div className="col-span-2 text-center py-4 text-gray-400">
                  <p>Connect platforms above to enable publishing</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Publishing Options</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="radio" name="publish_type" className="text-[#67c50a] focus:ring-[#67c50a]" />
                <span className="text-sm text-white">Publish Now</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="publish_type" className="text-[#67c50a] focus:ring-[#67c50a]" />
                <span className="text-sm text-white">Schedule for Later</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="publish_type" className="text-[#67c50a] focus:ring-[#67c50a]" />
                <span className="text-sm text-white">Optimal Time (AI)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};