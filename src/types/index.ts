export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'job_seeker' | 'employer';
  status: 'active' | 'blocked' | 'pending';
  createdAt: string;
  avatar?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  category: 'hospitality' | 'logistics' | 'construction' | 'travel' | 'tourism' | 'service';
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract';
  status: 'active' | 'inactive' | 'draft';
  applicants: number;
  createdAt: string;
  description: string;
  requirements: string[];
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface Payment {
  id: string;
  userId: string;
  jobId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'bank' | 'wallet';
  createdAt: string;
  userName: string;
  jobTitle: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalEmployers: number;
  totalJobs: number;
  monthlyRevenue: number;
  monthlyApplications: number[];
  jobSectors: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  revenueData: Array<{
    month: string;
    revenue: number;
  }>;
}