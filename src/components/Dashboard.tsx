import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { VideoCreator } from './VideoCreator';
import { Analytics } from './Analytics';
import { Templates } from './Templates';
import { AITools } from './AITools';
import { Distribution } from './Distribution';
import { Profile } from './Profile';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'create' | 'analytics' | 'templates' | 'ai-tools' | 'distribution' | 'profile'>('create');

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return <VideoCreator />;
      case 'analytics':
        return <Analytics />;
      case 'templates':
        return <Templates />;
      case 'ai-tools':
        return <AITools />;
      case 'distribution':
        return <Distribution />;
      case 'profile':
        return <Profile />;
      default:
        return <VideoCreator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-gradient-to-r from-[#67c50a]/5 via-[#7cd7c2]/5 to-[#ffd900]/5"></div>
      
      <div className="flex h-screen relative z-10">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onLogout={onLogout} />
          
          <main className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};