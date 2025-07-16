import React from 'react';
import { Bell, Search, Plus, LogOut, User, Settings } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search templates, effects, or ask AI..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a] focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-xl bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300 transform hover:scale-105">
            <Plus className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-xl bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300">
            <Bell className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};