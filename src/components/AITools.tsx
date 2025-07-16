import React from 'react';
import { Sparkles, Wand2, Palette, Type, Volume2, Image, Zap, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';

export const AITools: React.FC = () => {
  const { state, dispatch } = useApp();

  const aiTools = [
    {
      icon: Wand2,
      title: 'AI Video Enhancer',
      description: 'Automatically improve video quality, stabilization, and lighting',
      features: ['4K Upscaling', 'Noise Reduction', 'Auto Stabilization'],
      color: 'from-[#67c50a] to-[#7cd7c2]',
      isPopular: true
    },
    {
      icon: Type,
      title: 'Smart Captions',
      description: 'Generate accurate subtitles and animated text overlays',
      features: ['Multi-language', 'Custom Styling', 'Auto-sync'],
      color: 'from-[#ffd900] to-[#67c50a]',
      isPopular: false
    },
    {
      icon: Palette,
      title: 'Color Grading AI',
      description: 'Professional color correction and mood enhancement',
      features: ['Mood Detection', 'Style Transfer', 'Batch Processing'],
      color: 'from-[#7cd7c2] to-[#054e6f]',
      isPopular: true
    },
    {
      icon: Volume2,
      title: 'Audio Enhancement',
      description: 'Clean up audio, remove background noise, and optimize sound',
      features: ['Noise Removal', 'Voice Clarity', 'Auto Leveling'],
      color: 'from-[#054e6f] to-[#7cd7c2]',
      isPopular: false
    },
    {
      icon: Image,
      title: 'Background Remover',
      description: 'Instantly remove and replace backgrounds with AI precision',
      features: ['Real-time Processing', 'Edge Refinement', 'Green Screen'],
      color: 'from-[#67c50a] to-[#ffd900]',
      isPopular: true
    },
    {
      icon: Sparkles,
      title: 'Effect Generator',
      description: 'Create stunning visual effects and transitions automatically',
      features: ['Particle Effects', 'Transitions', 'Motion Graphics'],
      color: 'from-[#ffd900] to-[#7cd7c2]',
      isPopular: false
    }
  ];

  const handleUseTool = async (toolTitle: string) => {
    try {
      const process = await mockApi.processWithAI('demo-video', toolTitle);
      dispatch({ type: 'ADD_AI_PROCESS', payload: process });
      
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          dispatch({ 
            type: 'UPDATE_AI_PROCESS', 
            payload: { id: process.id, updates: { status: 'completed', progress: 100 } }
          });
        } else {
          dispatch({ 
            type: 'UPDATE_AI_PROCESS', 
            payload: { id: process.id, updates: { progress } }
          });
        }
      }, 1500);
    } catch (error) {
      console.error('Failed to start AI processing:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Sparkles className="w-8 h-8 mr-3 text-[#ffd900]" />
            AI Tools
          </h1>
          <p className="text-gray-400 mt-1">Enhance your content with powerful AI-driven tools</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white text-sm rounded-full">
            {state.user?.plan === 'pro' ? 'Unlimited Credits' : '12 Credits Remaining'}
          </div>
        </div>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <div key={index} className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {tool.isPopular && (
                  <span className="px-2 py-1 bg-[#ffd900] text-black text-xs font-medium rounded-lg">
                    Popular
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
              
              <div className="space-y-2 mb-4">
                {tool.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                    <Zap className="w-3 h-3 mr-2 text-[#67c50a]" />
                    {feature}
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleUseTool(tool.title)}
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${tool.color} text-white font-medium hover:opacity-90 transition-all duration-300`}
              >
                Use Tool
              </button>
            </div>
          );
        })}
      </div>

      {/* Recent Processes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Processes</h3>
          <div className="space-y-4">
            {state.aiProcesses.length > 0 ? (
              state.aiProcesses.slice(-4).map((process) => (
                <div key={process.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{process.title}</h4>
                      <p className="text-xs text-gray-400">{process.tool}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`
                      px-2 py-1 rounded-lg text-xs font-medium
                      ${process.status === 'completed' ? 'bg-[#67c50a] text-white' : 
                        process.status === 'processing' ? 'bg-[#ffd900] text-black' : 
                        'bg-white/10 text-gray-400'}
                    `}>
                      {process.status}
                    </div>
                    {process.status === 'processing' && (
                      <div className="w-16 bg-white/20 rounded-full h-1 mt-2">
                        <div 
                          className="bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] h-1 rounded-full transition-all duration-300"
                          style={{ width: `${process.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No AI processes yet. Start by using an AI tool!</p>
              </div>
            )}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Usage Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Credits Used This Month</span>
              <span className="text-white font-medium">38 / 50</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] h-2 rounded-full" style={{ width: '76%' }}></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-sm text-gray-400">Videos Enhanced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2.4K</div>
                <div className="text-sm text-gray-400">Hours Saved</div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white rounded-xl hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300 font-medium">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};