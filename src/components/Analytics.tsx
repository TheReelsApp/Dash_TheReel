import React from 'react';
import { TrendingUp, Eye, Heart, Share2, Play, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Analytics: React.FC = () => {
  const { state } = useApp();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const stats = [
    { 
      icon: Eye, 
      label: 'Total Views', 
      value: formatNumber(state.user?.stats.totalViews || 0), 
      change: '+12.5%', 
      color: 'from-[#67c50a] to-[#7cd7c2]' 
    },
    { 
      icon: Heart, 
      label: 'Videos Created', 
      value: state.user?.stats.videosCreated.toString() || '0', 
      change: '+8.2%', 
      color: 'from-[#ffd900] to-[#67c50a]' 
    },
    { 
      icon: Share2, 
      label: 'Engagement Rate', 
      value: (state.user?.stats.engagementRate || 0).toFixed(1) + '%', 
      change: '+15.3%', 
      color: 'from-[#7cd7c2] to-[#054e6f]' 
    },
    { 
      icon: Download, 
      label: 'Days Active', 
      value: state.user?.stats.daysActive.toString() || '0', 
      change: '+22.1%', 
      color: 'from-[#054e6f] to-[#7cd7c2]' 
    }
  ];

  const topVideos = state.videos.length > 0 ? 
    state.videos.slice(0, 4).map(video => ({
      title: video.title,
      views: formatNumber(video.views),
      engagement: '85%', // Mock engagement rate
      platform: video.platform[0] || 'Draft'
    })) : [
      { title: 'No videos yet', views: '0', engagement: '0%', platform: 'Create your first video!' }
    ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Track your content performance across platforms</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#67c50a]">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-[#67c50a] font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
            <TrendingUp className="w-5 h-5 text-[#67c50a]" />
          </div>
          <div className="h-64 bg-gradient-to-t from-[#67c50a]/10 to-transparent rounded-xl flex items-end justify-center">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-[#67c50a] mx-auto mb-2" />
              <p className="text-gray-400">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Top Videos */}
        <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">Top Performing Videos</h3>
          <div className="space-y-4">
            {topVideos.map((video, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-8 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{video.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                    <span>{video.views} views</span>
                    <span>{video.engagement} engagement</span>
                    <span className="text-[#67c50a]">{video.platform}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Platform Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {state.platforms.filter(p => p.connected).map((platform, index) => (
            <div key={index} className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                <span className="text-2xl">{platform.icon}</span>
              </div>
              <h4 className="text-lg font-semibold text-white">{platform.name}</h4>
              <p className="text-2xl font-bold text-[#67c50a] mt-1">{platform.followers}</p>
              <p className="text-sm text-gray-400">Total Views</p>
            </div>
          ))}
          {state.platforms.filter(p => p.connected).length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-400">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Connect platforms to see performance data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};