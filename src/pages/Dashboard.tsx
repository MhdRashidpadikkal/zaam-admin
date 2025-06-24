import React from 'react';
import { Users, Building, Briefcase, DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { StatsCard } from '../components/UI/StatsCard';
import { mockDashboardStats } from '../utils/mockData';

export const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;

  const recentActivities = [
    { 
      id: 1,
      action: 'New job posted', 
      details: 'Senior Hotel Manager - Grand Resort Hotels', 
      time: '2 minutes ago', 
      type: 'job',
      user: 'Sarah Johnson'
    },
    { 
      id: 2,
      action: 'Application approved', 
      details: 'Ahmed Al-Rashid for Executive Chef position', 
      time: '15 minutes ago', 
      type: 'application',
      user: 'System Auto-Approval'
    },
    { 
      id: 3,
      action: 'Payment received', 
      details: 'AED 250 from Fatima Al-Zahra', 
      time: '1 hour ago', 
      type: 'payment',
      user: 'Payment Gateway'
    },
    { 
      id: 4,
      action: 'New user registered', 
      details: 'Khalid Al-Mansoori (Job Seeker)', 
      time: '2 hours ago', 
      type: 'user',
      user: 'Registration System'
    },
    { 
      id: 5,
      action: 'Job application submitted', 
      details: 'Tourism Guide position by Aisha Mahmoud', 
      time: '3 hours ago', 
      type: 'application',
      user: 'Application System'
    }
  ];

  const topPerformingJobs = [
    { title: 'Senior Hotel Manager', applications: 45, company: 'Grand Resort Hotels', category: 'Hospitality' },
    { title: 'Executive Chef', applications: 38, company: 'Five Star Restaurant Group', category: 'Hospitality' },
    { title: 'Logistics Coordinator', applications: 32, company: 'Global Shipping Ltd', category: 'Logistics' },
    { title: 'Construction Site Supervisor', applications: 28, company: 'Emirates Construction Ltd', category: 'Construction' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-3">Welcome to ZAAM Dashboard</h1>
          <p className="text-blue-100 text-lg">Monitor your platform's performance and manage operations efficiently</p>
          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change="12%"
          changeType="increase"
          icon={Users}
          gradient="gradient-primary"
        />
        <StatsCard
          title="Employers"
          value={stats.totalEmployers.toLocaleString()}
          change="8%"
          changeType="increase"
          icon={Building}
          gradient="gradient-secondary"
        />
        <StatsCard
          title="Active Jobs"
          value={stats.totalJobs}
          change="15%"
          changeType="increase"
          icon={Briefcase}
          gradient="gradient-accent"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`AED ${stats.monthlyRevenue.toLocaleString()}`}
          change="23%"
          changeType="increase"
          icon={DollarSign}
          gradient="gradient-primary"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Applications Chart */}
        <div className="gradient-card p-8 rounded-2xl gradient-hover">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Monthly Applications</h3>
              <p className="text-gray-600">Application trends over the year</p>
            </div>
            <div className="flex items-center text-sm text-green-600 gradient-card px-3 py-2 rounded-lg">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15% growth
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.monthlyApplications.map((value, index) => ({
              month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
              applications: value
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }} 
              />
              <Bar dataKey="applications" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#002D62" />
                  <stop offset="100%" stopColor="#00509D" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Job Sectors Distribution */}
        <div className="gradient-card p-8 rounded-2xl gradient-hover">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900">Job Sectors Distribution</h3>
            <p className="text-gray-600">Current job market breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.jobSectors}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {stats.jobSectors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-6">
            {stats.jobSectors.map((sector, index) => (
              <div key={index} className="flex items-center gradient-card px-3 py-2 rounded-lg">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: sector.color }}
                />
                <span className="text-sm font-medium text-gray-700">{sector.name}</span>
                <span className="text-xs text-gray-500 ml-2">({sector.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="gradient-card p-8 rounded-2xl gradient-hover">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Revenue Trend</h3>
            <p className="text-gray-600">Monthly revenue performance</p>
          </div>
          <div className="flex items-center text-sm text-green-600 gradient-card px-3 py-2 rounded-lg">
            <TrendingUp className="h-4 w-4 mr-1" />
            +23% growth
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={stats.revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              formatter={(value) => [`AED ${value.toLocaleString()}`, 'Revenue']}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#002D62" 
              strokeWidth={3}
              fill="url(#areaGradient)"
            />
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#002D62" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00509D" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="gradient-card p-8 rounded-2xl gradient-hover">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start p-4 gradient-light rounded-xl gradient-hover">
                <div className={`w-3 h-3 rounded-full mt-2 mr-4 ${
                  activity.type === 'job' ? 'bg-blue-500' :
                  activity.type === 'application' ? 'bg-green-500' :
                  activity.type === 'payment' ? 'bg-yellow-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className="text-xs text-gray-500">by {activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Jobs */}
        <div className="gradient-card p-8 rounded-2xl gradient-hover">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Jobs</h3>
          <div className="space-y-4">
            {topPerformingJobs.map((job, index) => (
              <div key={index} className="flex items-center justify-between p-4 gradient-light rounded-xl gradient-hover">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{job.title}</div>
                  <div className="text-sm text-gray-600">{job.company}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="gradient-card px-2 py-1 rounded">{job.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">{job.applications}</div>
                  <div className="text-xs text-gray-500">applications</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};