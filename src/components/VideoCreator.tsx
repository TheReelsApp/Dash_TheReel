import React, { useState } from 'react';
import { Upload, Wand2, Play, Download, Share2, Sparkles, Image, Music, Type, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';

export const VideoCreator: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { state, dispatch } = useApp();

  const aiFeatures = [
    { icon: Wand2, label: 'AI Enhancement', description: 'Automatically improve video quality' },
    { icon: Type, label: 'Auto Captions', description: 'Generate accurate subtitles' },
    { icon: Music, label: 'Sound Sync', description: 'Match audio to video beats' },
    { icon: Palette, label: 'Color Grade', description: 'Professional color correction' }
  ];

  const quickActions = [
    { icon: Image, label: 'Add Background', color: 'from-[#67c50a] to-[#7cd7c2]' },
    { icon: Music, label: 'Add Music', color: 'from-[#ffd900] to-[#67c50a]' },
    { icon: Type, label: 'Add Text', color: 'from-[#7cd7c2] to-[#054e6f]' },
    { icon: Sparkles, label: 'AI Effects', color: 'from-[#054e6f] to-[#7cd7c2]' }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    try {
      const video = await mockApi.uploadVideo(file);
      dispatch({ type: 'ADD_VIDEO', payload: video });
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleAIFeature = async (feature: string) => {
    if (!selectedFile && state.videos.length === 0) {
      alert('Please upload a video first');
      return;
    }

    try {
      const videoId = state.videos[0]?.id || 'demo';
      const process = await mockApi.processWithAI(videoId, feature);
      dispatch({ type: 'ADD_AI_PROCESS', payload: process });
      
      // Simulate progress updates
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
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
      }, 1000);
    } catch (error) {
      console.error('AI processing failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Create Video</h1>
          <p className="text-gray-400 mt-1">Transform your ideas into viral content</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300">
            <Download className="w-4 h-4 mr-2 inline" />
            Export
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white rounded-xl hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300">
            <Share2 className="w-4 h-4 mr-2 inline" />
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <div className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isUploading ? 'border-[#67c50a]' : 'border-white/20 hover:border-[#67c50a]'
            }`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isUploading ? 'Uploading...' : 'Upload Your Content'}
              </h3>
              <p className="text-gray-400 mb-4">
                {selectedFile ? selectedFile.name : 'Drag & drop videos, images, or audio files here'}
              </p>
              
              {isUploading ? (
                <div className="w-full max-w-xs mx-auto">
                  <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400">{Math.round(uploadProgress)}% complete</p>
                </div>
              ) : (
                <label className="inline-block px-6 py-3 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white rounded-xl hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300 cursor-pointer">
                  Choose Files
                  <input
                    type="file"
                    accept="video/*,image/*,audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
              
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
                <span>MP4, MOV, AVI</span>
                <span>•</span>
                <span>Max 500MB</span>
                <span>•</span>
                <span>Up to 4K</span>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="mt-6 glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Preview</h3>
              <button 
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                disabled={!selectedFile && state.videos.length === 0}
              >
                <Play className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center relative overflow-hidden">
              {selectedFile && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#67c50a]/20 to-[#7cd7c2]/20"></div>
              )}
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">
                  {selectedFile ? `Preview: ${selectedFile.name}` : 'Your video preview will appear here'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Panel */}
        <div className="space-y-6">
          {/* AI Features */}
          <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-[#ffd900]" />
              AI Features
            </h3>
            <div className="space-y-3">
              {aiFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleAIFeature(feature.label)}
                    className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">{feature.label}</h4>
                        <p className="text-xs text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-center transition-all duration-300 transform hover:scale-105"
                  >
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-white">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Projects</h3>
            <div className="space-y-3">
              {state.videos.length > 0 ? (
                state.videos.slice(0, 3).map((video) => (
                  <div key={video.id} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-8 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] rounded-lg"></div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{video.title}</h4>
                      <p className="text-xs text-gray-400">{new Date(video.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                [1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 opacity-50">
                  <div className="w-12 h-8 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] rounded-lg"></div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Project {i}</h4>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};