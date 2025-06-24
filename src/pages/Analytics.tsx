import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, Briefcase, DollarSign, CheckCircle } from 'lucide-react';
import { StatsCard } from '../components/UI/StatsCard';

export const Analytics: React.FC = () => {
  const jobCategoryData = [
    { category: 'Hospitality', jobs: 35, applications: 245, success: 78 },
    { category: 'Logistics', jobs: 25, applications: 189, success: 65 },
    { category: 'Construction', jobs: 20, applications: 156, success: 52 },
    { category: 'Travel', jobs: 12, applications: 98, success: 31 },
    { category: 'Tourism', jobs: 8, applications: 67, success: 22 },
  ];

  const monthlyTrends = [
    { month: 'Jan', users: 145, jobs: 23, revenue: 3500, applications: 189 },
    { month: 'Feb', users: 178, jobs: 28, revenue: 4200, applications: 234 },
    { month: 'Mar', users: 203, jobs: 31, revenue: 3800, applications: 267 },
    { month: 'Apr', users: 234, jobs: 35, revenue: 4560, applications: 298 },
    { month: 'May', users: 267, jobs: 42, revenue: 5200, applications: 345 },
    { month: 'Jun', users: 298, jobs: 38, revenue: 4800, applications: 378 },
  ];

  const approvalRateData = [
    { name: 'Approved', value: 68, color: '#10b981' },
    { name: 'Rejected', value: 22, color: '#ef4444' },
    { name: 'Pending', value: 10, color: '#f59e0b' },
  ];

  const userActivityData = [
    { time: '00:00', jobSeekers: 12, employers: 3 },
    { time: '04:00', jobSeekers: 8, employers: 1 },
    { time: '08:00', jobSeekers: 45, employers: 12 },
    { time: '12:00', jobSeekers: 78, employers: 23 },
    { time: '16:00', jobSeekers: 89, employers: 34 },
    { time: '20:00', jobSeekers: 56, employers: 18 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600">Comprehensive insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Application Success Rate"
          value="68%"
          change="12%"
          changeType="increase"
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Avg. Time to Hire"
          value="5.2 days"
          change="1.3 days"
          changeType="decrease"
          icon={TrendingDown}
          color="blue"
        />
        <StatsCard
          title="Monthly Growth"
          value="+23%"
          change="8%"
          changeType="increase"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Revenue per Job"
          value="$156"
          change="$23"
          changeType="increase"
          icon={DollarSign}
          color="yellow"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Category Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Job Category Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobs" fill="#3b82f6" name="Jobs Posted" />
              <Bar dataKey="applications" fill="#10b981" name="Applications" />
              <Bar dataKey="success" fill="#f59e0b" name="Successful Hires" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Approval Rate Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Approval Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={approvalRateData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {approvalRateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {approvalRateData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Growth Trends</h3>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            Overall growth +23%
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              name="New Users"
            />
            <Line 
              type="monotone" 
              dataKey="jobs" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              name="Jobs Posted"
            />
            <Line 
              type="monotone" 
              dataKey="applications" 
              stroke="#f59e0b" 
              strokeWidth={3} 
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
              name="Applications"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User Activity Pattern */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily User Activity Pattern</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={userActivityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="jobSeekers" 
              stackId="1" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.6}
              name="Job Seekers"
            />
            <Area 
              type="monotone" 
              dataKey="employers" 
              stackId="1" 
              stroke="#10b981" 
              fill="#10b981" 
              fillOpacity={0.6}
              name="Employers"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Categories</h3>
          <div className="space-y-4">
            {jobCategoryData.slice(0, 3).map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{category.category}</div>
                  <div className="text-sm text-gray-500">{category.applications} applications</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{category.success} hires</div>
                  <div className="text-sm text-green-600">
                    {Math.round((category.success / category.applications) * 100)}% success rate
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Highest Revenue Month</div>
                <div className="text-sm text-gray-500">May 2024</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">$5,200</div>
                <div className="text-sm text-green-600">+24% growth</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Average Revenue per User</div>
                <div className="text-sm text-gray-500">Based on completed transactions</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-blue-600">$18.7</div>
                <div className="text-sm text-blue-600">Industry leading</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Projected Monthly Revenue</div>
                <div className="text-sm text-gray-500">Next month forecast</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-yellow-600">$5,800</div>
                <div className="text-sm text-yellow-600">+11% projected growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};