import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { useApp } from '../context/AppContext';

interface LoginProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { dispatch } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await mockApi.login(email, password);
      dispatch({ type: 'SET_USER', payload: user });
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="glass-panel p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/Logo.png"
              alt="TheReelsApp Logo"
              className="w-34 h-34 object-contain"
            />

          </div>

        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm">
            Demo: email: demo@thereelsapp.com, password: demo123
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a] focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#67c50a] focus:ring-[#67c50a]"
              />
              <span className="ml-2 text-sm text-gray-300">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#67c50a] hover:text-[#7cd7c2] transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white font-medium hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#67c50a] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Switch to Signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-[#67c50a] hover:text-[#7cd7c2] font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
