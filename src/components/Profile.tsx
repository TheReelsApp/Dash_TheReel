import React, { useState } from 'react';
import { User, Settings, Crown, Award, Target, TrendingUp, Calendar, Edit } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'settings'>('overview');
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: state.user?.fullName || '',
    email: state.user?.email || '',
    bio: ''
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const stats = [
    { 
      icon: TrendingUp, 
      label: 'Total Views', 
      value: formatNumber(state.user?.stats.totalViews || 0), 
      color: 'from-[#67c50a] to-[#7cd7c2]' 
    },
    { 
      icon: Award, 
      label: 'Videos Created', 
      value: state.user?.stats.videosCreated.toString() || '0', 
      color: 'from-[#ffd900] to-[#67c50a]' 
    },
    { 
      icon: Target, 
      label: 'Engagement Rate', 
      value: (state.user?.stats.engagementRate || 0).toFixed(1) + '%', 
      color: 'from-[#7cd7c2] to-[#054e6f]' 
    },
    { 
      icon: Calendar, 
      label: 'Days Active', 
      value: state.user?.stats.daysActive.toString() || '0', 
      color: 'from-[#054e6f] to-[#7cd7c2]' 
    }
  ];

  const achievements = [
    { icon: '🏆', title: 'First Million', description: 'Reached 1M total views', unlocked: true },
    { icon: '🎯', title: 'Viral Creator', description: 'Created 5 videos with 100K+ views', unlocked: true },
    { icon: '⚡', title: 'Speed Master', description: 'Created 10 videos in one day', unlocked: true },
    { icon: '🌟', title: 'Trending Expert', description: 'Had 3 videos trending simultaneously', unlocked: false },
    { icon: '🔥', title: 'Consistency King', description: 'Posted daily for 30 days', unlocked: false },
    { icon: '💎', title: 'Quality Creator', description: 'Maintained 90%+ engagement rate', unlocked: false }
  ];

  const recentActivity = [
    ...state.videos.slice(-2).map(video => ({
      action: `Created "${video.title}"`,
      platform: 'Studio',
      time: new Date(video.createdAt).toLocaleDateString()
    })),
    ...state.aiProcesses.slice(-2).map(process => ({
      action: `Used ${process.tool} on "${process.title}"`,
      platform: 'AI Tools',
      time: new Date(process.createdAt).toLocaleDateString()
    }))
  ];

  const handleSaveProfile = () => {
    if (state.user) {
      dispatch({ 
        type: 'SET_USER', 
        payload: { 
          ...state.user, 
          fullName: editForm.fullName,
          email: editForm.email 
        } 
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{state.user?.fullName || 'User'}</h1>
            <p className="text-gray-400 flex items-center mt-1">
              <Crown className="w-4 h-4 mr-2 text-[#ffd900]" />
              {state.user?.plan === 'pro' ? 'Pro Creator' : 'Free User'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center"
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/5 p-1 rounded-xl">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'achievements', label: 'Achievements' },
          { id: 'settings', label: 'Settings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300
              ${activeTab === tab.id
                ? 'bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-[#67c50a] mt-2"></div>
                    <div>
                      <p className="text-sm text-white">{activity.action}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-[#67c50a]">{activity.platform}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-400">
                    <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No recent activity. Start creating!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Videos Created</span>
                  <span className="text-white font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Views</span>
                  <span className="text-white font-medium">450K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">AI Tools Used</span>
                  <span className="text-white font-medium">38</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Templates Used</span>
                  <span className="text-white font-medium">15</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-[#67c50a]/10 to-[#7cd7c2]/10 rounded-xl">
                <h4 className="text-sm font-medium text-white mb-2">Goal Progress</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Monthly Target</span>
                  <span className="text-sm text-white">12/15 videos</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className={`
                glass-panel p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300
                ${achievement.unlocked 
                  ? 'bg-white/5 border-[#67c50a]/50' 
                  : 'bg-white/5 border-white/10 opacity-60'
                }
              `}>
                <div className="text-center">
                  <div className={`
                    text-4xl mb-4 ${achievement.unlocked ? '' : 'grayscale'}
                  `}>
                    {achievement.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${achievement.unlocked 
                      ? 'bg-[#67c50a] text-white' 
                      : 'bg-white/10 text-gray-400'
                    }
                  `}>
                    {achievement.unlocked ? 'Unlocked' : 'Locked'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <input
                  type="text"
                  value={isEditing ? editForm.fullName : state.user?.fullName || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={isEditing ? editForm.email : state.user?.email || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  rows={3}
                  value={isEditing ? editForm.bio : ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a] resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
              {isEditing && (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white rounded-xl hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Email Notifications</span>
                <span className="text-white font-medium">{formatNumber(state.user?.stats.totalViews || 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Auto-publish to connected platforms</span>
                <span className="text-white font-medium">{state.aiProcesses.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">AI Enhancement by default</span>
                <span className="text-white font-medium">{Math.floor(state.videos.length * 0.6)}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Subscription</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-white font-medium">{state.user?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</h4>
                <span className="text-sm text-white">{state.videos.length}/15 videos</span>
              </div>
              <span className="px-3 py-1 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white text-sm rounded-full">
                {state.user?.plan === 'pro' ? 'Active' : 'Free'}
              </span>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300">
                Manage Subscription
              </button>
              {state.user?.plan !== 'pro' && (
                <button className="px-4 py-2 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white rounded-xl hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300">
                  Upgrade Plan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};