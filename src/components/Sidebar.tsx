import React from 'react';
import { Play, BarChart3, Layout, Sparkles, Share2, User } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: 'create' | 'analytics' | 'templates' | 'ai-tools' | 'distribution' | 'profile') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'create', label: 'Create', icon: Play, color: 'from-[#67c50a] to-[#7cd7c2]' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'from-[#7cd7c2] to-[#054e6f]' },
    { id: 'templates', label: 'Templates', icon: Layout, color: 'from-[#ffd900] to-[#67c50a]' },
    { id: 'ai-tools', label: 'AI Tools', icon: Sparkles, color: 'from-[#054e6f] to-[#7cd7c2]' },
    { id: 'distribution', label: 'Distribution', icon: Share2, color: 'from-[#67c50a] to-[#ffd900]' },
    { id: 'profile', label: 'Profile', icon: User, color: 'from-[#7cd7c2] to-[#054e6f]' }
  ];

  return (
    <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col min-h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <img
            src="/Logo.png"
            alt="TheReelsApp Logo"
            className="object-contain rounded-xl"
            style={{ width: '160px', height: 'auto' }}
          />
          <div>
            {/* You can add logo text or tagline here if needed */}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id as any)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive
                    ? 'bg-white/10 text-white shadow-lg cursor-pointer'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer'
                  }
                `}
              >
                <div
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    ${isActive ? `bg-gradient-to-r ${item.color}` : 'bg-white/5'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium select-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer CTA */}
      <div className="p-5 border-t border-white/10">
        <div className="bg-gradient-to-r from-[#67c50a]/20 to-[#7cd7c2]/20 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#ffd900]" />
            <span className="text-sm font-semibold text-white">Pro Plan</span>
          </div>
          <p className="text-xs text-gray-300 mb-4">
            Unlimited AI generations & premium features
          </p>
          <button className="w-full bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white text-sm font-semibold py-2 rounded-lg hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};
