"use client";

import { useAuth } from '../../context/AuthContext';
import DashboardStats from '../../component/DashboardStats';

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
          <a href="/login" className="text-blue-400 hover:text-blue-300">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <DashboardStats />
      </div>
    </div>
  );
} 