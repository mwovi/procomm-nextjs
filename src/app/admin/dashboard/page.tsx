'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { 
  FileText, 
  ImageIcon, 
  MessageSquare, 
  Eye,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { LucideIcon } from 'lucide-react';

interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalImages: number;
  newMessages: number;
  totalMessages: number;
  recentActivity: Array<{
    id: string;
    type: 'blog' | 'image' | 'message';
    title: string;
    timestamp: string;
  }>;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalImages: 0,
    newMessages: 0,
    totalMessages: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    subtitle, 
    href 
  }: { 
    title: string; 
    value: number; 
    icon: LucideIcon; 
    color: string; 
    subtitle?: string; 
    href?: string; 
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {href && (
            <Link 
              href={href}
              className="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block"
            >
              View all →
            </Link>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome to your Admin Dashboard</h1>
              <p className="text-blue-100">
                Manage your content, view analytics, and stay on top of your website&apos;s performance.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105"
            >
              <LogOut size={18} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Blog Posts"
            value={stats.totalBlogs}
            icon={FileText}
            color="bg-blue-500"
            subtitle={`${stats.publishedBlogs} published, ${stats.draftBlogs} drafts`}
            href="/admin/blogs"
          />
          
          <StatCard
            title="Gallery Images"
            value={stats.totalImages}
            icon={ImageIcon}
            color="bg-green-500"
            href="/admin/gallery"
          />
          
          <StatCard
            title="Messages"
            value={stats.totalMessages}
            icon={MessageSquare}
            color="bg-purple-500"
            subtitle={`${stats.newMessages} new messages`}
            href="/admin/contacts"
          />
          
          <StatCard
            title="Monthly Views"
            value={1250}
            icon={Eye}
            color="bg-orange-500"
            subtitle="↑ 12% from last month"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/blogs/new"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FileText size={20} className="text-blue-600 mr-3" />
              <span className="font-medium text-gray-900">Create New Blog Post</span>
            </Link>
            
            <Link
              href="/admin/gallery/upload"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <ImageIcon size={20} className="text-green-600 mr-3" />
              <span className="font-medium text-gray-900">Upload Images</span>
            </Link>
            
            <Link
              href="/admin/contacts"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <MessageSquare size={20} className="text-purple-600 mr-3" />
              <span className="font-medium text-gray-900">Check Messages</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          {stats.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {activity.type === 'blog' && <FileText size={16} className="text-blue-600" />}
                    {activity.type === 'image' && <ImageIcon size={16} className="text-green-600" />}
                    {activity.type === 'message' && <MessageSquare size={16} className="text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;