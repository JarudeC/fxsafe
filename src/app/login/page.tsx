"use client";

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login("FlashPhi@example.com", "TestPassword@nonono");
      router.push('/?login=success');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 rounded-2xl backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-white/60">Sign in to your FXSafe account</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue=""
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                defaultValue=""
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-[#00C9A7] to-[#007BFF] hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#00C9A7] hover:text-[#007BFF]">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 