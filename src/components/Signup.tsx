import React, { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { useApp } from '../context/AppContext';

interface SignupProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { dispatch } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const user = await mockApi.signup(formData.fullName, formData.email, formData.password);
      dispatch({ type: 'SET_USER', payload: user });
      onSignup();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="glass-panel p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        
        {/* Logo Image */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <img
              src="/Logo.png"
              alt="TheReelsApp Logo"
              className="w-34 h-34 object-contain"
            />
          </div>
          
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a] focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a] focus:border-transparent transition-all duration-300"
                  placeholder="Create a password"
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#67c50a] focus:border-transparent transition-all duration-300"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#67c50a] focus:ring-[#67c50a]"
              required
            />
            <span className="ml-2 text-sm text-gray-300">
              I agree to the{' '}
              <a href="#" className="text-[#67c50a] hover:text-[#7cd7c2] transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#67c50a] hover:text-[#7cd7c2] transition-colors">
                Privacy Policy
              </a>
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#67c50a] to-[#7cd7c2] text-white font-medium hover:from-[#7cd7c2] hover:to-[#67c50a] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#67c50a] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        
        

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-[#67c50a] hover:text-[#7cd7c2] font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
