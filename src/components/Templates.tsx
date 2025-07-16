import React, { useState } from 'react';
import { Search, Filter, Play, Heart, Download, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Templates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { state } = useApp();

  const categories = [
    { id: 'all', label: 'All Templates', count: 150 },
    { id: 'trending', label: 'Trending', count: 25 },
    { id: 'business', label: 'Business', count: 30 },
    { id: 'lifestyle', label: 'Lifestyle', count: 45 },
    { id: 'music', label: 'Music', count: 35 },
    { id: 'gaming', label: 'Gaming', count: 15 }
  ];

  const getGradientClass = (thumbnail: string) => {
    const gradients = {
      'gradient-1': 'from-[#67c50a] to-[#7cd7c2]',
      'gradient-2': 'from-[#ffd900] to-[#67c50a]',
      'gradient-3': 'from-[#7cd7c2] to-[#054e6f]',
      'gradient-4': 'from-[#054e6f] to-[#7cd7c2]',
      'gradient-5': 'from-[#67c50a] to-[#ffd900]',
      'gradient-6': 'from-[#ffd900] to-[#7cd7c2]'
    };
    return gradients[thumbnail as keyof typeof gradients] || 'from-[#67c50a] to-[#7cd7c2]';
  };

  const filteredTemplates = state.templates
    .filter(template => selectedCategory === 'all' || template.category === selectedCategory)
    .filter(template => 
      searchTerm === '' || 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleUseTemplate = (templateId: string) => {
    const template = state.templates.find(t => t.id === templateId);
    if (template) {
      // In a real app, this would create a new video project with the template
      console.log('Using template:', template.title);
      alert(`Starting new project with "${template.title}" template!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Templates</h1>
          <p className="text-gray-400 mt-1">Professional templates to jumpstart your creativity</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a] focus:border-transparent"
            />
          </div>
          <button className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 text-sm font-medium
              ${selectedCategory === category.id
                ? 'bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white'
                : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
              }
            `}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="glass-panel rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            {/* Thumbnail */}
            <div className={`relative h-48 bg-gradient-to-br ${getGradientClass(template.thumbnail)} flex items-center justify-center`}>
              <Play className="w-12 h-12 text-white/80" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex space-x-2">
                {template.isNew && (
                  <span className="px-2 py-1 bg-[#ffd900] text-black text-xs font-medium rounded-lg">
                    New
                  </span>
                )}
                {template.isPro && (
                  <span className="px-2 py-1 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white text-xs font-medium rounded-lg flex items-center">
                    <Zap className="w-3 h-3 mr-1" />
                    Pro
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="p-2 rounded-lg bg-black/20 text-white hover:bg-black/40 transition-all duration-300">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{template.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {template.likes}
                  </span>
                  <span className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    {template.downloads}
                  </span>
                </div>
                <span className="capitalize text-[#67c50a]">{template.category}</span>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleUseTemplate(template.id)}
                  className="flex-1 py-2 bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white rounded-lg hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300 text-sm font-medium"
                >
                  Use Template
                </button>
                <button className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        {filteredTemplates.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No templates found matching your criteria</p>
          </div>
        )}
        <button className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-medium">
          Load More Templates
        </button>
      </div>
    </div>
  );
};