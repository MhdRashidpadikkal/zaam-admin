import { User, Job, Application, Payment, DashboardStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Al-Rashid',
    email: 'ahmed.rashid@email.com',
    phone: '+971-50-123-4567',
    type: 'job_seeker',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@grandresort.com',
    phone: '+971-50-234-5678',
    type: 'employer',
    status: 'active',
    createdAt: '2024-01-10T14:20:00Z',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '3',
    name: 'Mohammed Hassan',
    email: 'mohammed.hassan@email.com',
    phone: '+971-50-345-6789',
    type: 'job_seeker',
    status: 'pending',
    createdAt: '2024-01-20T09:15:00Z',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '4',
    name: 'Fatima Al-Zahra',
    email: 'fatima.zahra@email.com',
    phone: '+971-50-456-7890',
    type: 'job_seeker',
    status: 'active',
    createdAt: '2024-01-18T16:45:00Z',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '5',
    name: 'Global Logistics Corp',
    email: 'hr@globallogistics.com',
    phone: '+971-50-567-8901',
    type: 'employer',
    status: 'active',
    createdAt: '2024-01-12T11:30:00Z',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '6',
    name: 'Omar Abdullah',
    email: 'omar.abdullah@email.com',
    phone: '+971-50-678-9012',
    type: 'job_seeker',
    status: 'blocked',
    createdAt: '2024-01-08T13:20:00Z',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '7',
    name: 'Aisha Mahmoud',
    email: 'aisha.mahmoud@email.com',
    phone: '+971-50-789-0123',
    type: 'job_seeker',
    status: 'active',
    createdAt: '2024-01-25T08:15:00Z',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '8',
    name: 'Emirates Construction Ltd',
    email: 'recruitment@emiratesconstruction.ae',
    phone: '+971-50-890-1234',
    type: 'employer',
    status: 'active',
    createdAt: '2024-01-05T10:00:00Z',
    avatar: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '9',
    name: 'Khalid Al-Mansoori',
    email: 'khalid.mansoori@email.com',
    phone: '+971-50-901-2345',
    type: 'job_seeker',
    status: 'pending',
    createdAt: '2024-01-28T14:30:00Z',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '10',
    name: 'Luxury Travel Agency',
    email: 'jobs@luxurytravel.ae',
    phone: '+971-50-012-3456',
    type: 'employer',
    status: 'active',
    createdAt: '2024-01-03T09:45:00Z',
    avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Hotel Manager',
    company: 'Grand Resort Hotels',
    category: 'hospitality',
    location: 'Dubai, UAE',
    salary: 'AED 18,000 - 25,000',
    type: 'full-time',
    status: 'active',
    applicants: 45,
    createdAt: '2024-01-12T08:00:00Z',
    description: 'Lead luxury resort operations with 5-star service standards. Manage daily operations, staff coordination, and guest satisfaction initiatives.',
    requirements: ['8+ years hospitality management', 'Bachelor\'s degree in Hotel Management', 'Fluent in English and Arabic', 'Leadership and team management skills']
  },
  {
    id: '2',
    title: 'Logistics Coordinator',
    company: 'Global Shipping Ltd',
    category: 'logistics',
    location: 'Abu Dhabi, UAE',
    salary: 'AED 12,000 - 16,000',
    type: 'full-time',
    status: 'active',
    applicants: 32,
    createdAt: '2024-01-18T12:30:00Z',
    description: 'Coordinate international shipping operations, manage supply chain logistics, and ensure timely delivery of goods across the region.',
    requirements: ['5+ years logistics experience', 'Supply chain management knowledge', 'Proficiency in logistics software', 'Problem-solving abilities']
  },
  {
    id: '3',
    title: 'Construction Site Supervisor',
    company: 'Emirates Construction Ltd',
    category: 'construction',
    location: 'Sharjah, UAE',
    salary: 'AED 15,000 - 20,000',
    type: 'full-time',
    status: 'active',
    applicants: 28,
    createdAt: '2024-01-22T10:15:00Z',
    description: 'Oversee construction projects, ensure safety compliance, manage workforce, and maintain quality standards on-site.',
    requirements: ['10+ years construction experience', 'Safety certification', 'Project management skills', 'Knowledge of UAE building codes']
  },
  {
    id: '4',
    title: 'Travel Consultant',
    company: 'Luxury Travel Agency',
    category: 'travel',
    location: 'Dubai, UAE',
    salary: 'AED 8,000 - 12,000',
    type: 'full-time',
    status: 'active',
    applicants: 19,
    createdAt: '2024-01-25T14:20:00Z',
    description: 'Provide personalized travel planning services, create custom itineraries, and deliver exceptional customer experiences.',
    requirements: ['3+ years travel industry experience', 'Excellent communication skills', 'Knowledge of global destinations', 'Customer service excellence']
  },
  {
    id: '5',
    title: 'Tourism Guide',
    company: 'Desert Adventures Tourism',
    category: 'tourism',
    location: 'Dubai, UAE',
    salary: 'AED 6,000 - 9,000',
    type: 'part-time',
    status: 'active',
    applicants: 15,
    createdAt: '2024-01-28T09:30:00Z',
    description: 'Lead exciting desert safari tours, cultural experiences, and adventure activities for international tourists.',
    requirements: ['Tourism certification', 'Multilingual abilities', 'Cultural knowledge', 'Adventure activity experience']
  },
  {
    id: '6',
    title: 'Executive Chef',
    company: 'Five Star Restaurant Group',
    category: 'hospitality',
    location: 'Dubai, UAE',
    salary: 'AED 22,000 - 30,000',
    type: 'full-time',
    status: 'active',
    applicants: 38,
    createdAt: '2024-01-20T16:45:00Z',
    description: 'Lead culinary operations, menu development, kitchen management, and maintain highest food quality standards.',
    requirements: ['12+ years culinary experience', 'Culinary arts degree', 'International cuisine expertise', 'Team leadership skills']
  },
  {
    id: '7',
    title: 'Warehouse Manager',
    company: 'Regional Distribution Center',
    category: 'logistics',
    location: 'Ajman, UAE',
    salary: 'AED 14,000 - 18,000',
    type: 'full-time',
    status: 'inactive',
    applicants: 22,
    createdAt: '2024-01-15T11:00:00Z',
    description: 'Manage warehouse operations, inventory control, staff supervision, and optimize distribution processes.',
    requirements: ['7+ years warehouse management', 'Inventory management systems', 'Staff supervision experience', 'Process optimization skills']
  },
  {
    id: '8',
    title: 'Customer Service Representative',
    company: 'Premium Services Co.',
    category: 'service',
    location: 'Dubai, UAE',
    salary: 'AED 5,000 - 7,000',
    type: 'full-time',
    status: 'active',
    applicants: 67,
    createdAt: '2024-01-30T13:15:00Z',
    description: 'Provide exceptional customer support, handle inquiries, resolve issues, and maintain customer satisfaction.',
    requirements: ['2+ years customer service', 'Excellent communication', 'Problem-solving skills', 'CRM software knowledge']
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    userId: '1',
    jobTitle: 'Senior Hotel Manager',
    applicantName: 'Ahmed Al-Rashid',
    applicantEmail: 'ahmed.rashid@email.com',
    status: 'approved',
    appliedAt: '2024-01-20T14:30:00Z',
    paymentStatus: 'completed'
  },
  {
    id: '2',
    jobId: '2',
    userId: '3',
    jobTitle: 'Logistics Coordinator',
    applicantName: 'Mohammed Hassan',
    applicantEmail: 'mohammed.hassan@email.com',
    status: 'pending',
    appliedAt: '2024-01-21T10:15:00Z',
    paymentStatus: 'pending'
  },
  {
    id: '3',
    jobId: '3',
    userId: '4',
    jobTitle: 'Construction Site Supervisor',
    applicantName: 'Fatima Al-Zahra',
    applicantEmail: 'fatima.zahra@email.com',
    status: 'approved',
    appliedAt: '2024-01-22T16:20:00Z',
    paymentStatus: 'completed'
  },
  {
    id: '4',
    jobId: '4',
    userId: '7',
    jobTitle: 'Travel Consultant',
    applicantName: 'Aisha Mahmoud',
    applicantEmail: 'aisha.mahmoud@email.com',
    status: 'pending',
    appliedAt: '2024-01-25T11:45:00Z',
    paymentStatus: 'completed'
  },
  {
    id: '5',
    jobId: '5',
    userId: '9',
    jobTitle: 'Tourism Guide',
    applicantName: 'Khalid Al-Mansoori',
    applicantEmail: 'khalid.mansoori@email.com',
    status: 'rejected',
    appliedAt: '2024-01-28T09:30:00Z',
    paymentStatus: 'failed'
  },
  {
    id: '6',
    jobId: '6',
    userId: '1',
    jobTitle: 'Executive Chef',
    applicantName: 'Ahmed Al-Rashid',
    applicantEmail: 'ahmed.rashid@email.com',
    status: 'pending',
    appliedAt: '2024-01-29T14:15:00Z',
    paymentStatus: 'completed'
  },
  {
    id: '7',
    jobId: '8',
    userId: '4',
    jobTitle: 'Customer Service Representative',
    applicantName: 'Fatima Al-Zahra',
    applicantEmail: 'fatima.zahra@email.com',
    status: 'approved',
    appliedAt: '2024-01-30T10:00:00Z',
    paymentStatus: 'completed'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    userId: '1',
    jobId: '1',
    amount: 250,
    status: 'completed',
    method: 'card',
    createdAt: '2024-01-20T14:30:00Z',
    userName: 'Ahmed Al-Rashid',
    jobTitle: 'Senior Hotel Manager'
  },
  {
    id: 'PAY-002',
    userId: '4',
    jobId: '3',
    amount: 250,
    status: 'completed',
    method: 'bank',
    createdAt: '2024-01-22T16:20:00Z',
    userName: 'Fatima Al-Zahra',
    jobTitle: 'Construction Site Supervisor'
  },
  {
    id: 'PAY-003',
    userId: '7',
    jobId: '4',
    amount: 200,
    status: 'completed',
    method: 'wallet',
    createdAt: '2024-01-25T11:45:00Z',
    userName: 'Aisha Mahmoud',
    jobTitle: 'Travel Consultant'
  },
  {
    id: 'PAY-004',
    userId: '3',
    jobId: '2',
    amount: 250,
    status: 'pending',
    method: 'card',
    createdAt: '2024-01-21T10:15:00Z',
    userName: 'Mohammed Hassan',
    jobTitle: 'Logistics Coordinator'
  },
  {
    id: 'PAY-005',
    userId: '9',
    jobId: '5',
    amount: 150,
    status: 'failed',
    method: 'card',
    createdAt: '2024-01-28T09:30:00Z',
    userName: 'Khalid Al-Mansoori',
    jobTitle: 'Tourism Guide'
  },
  {
    id: 'PAY-006',
    userId: '1',
    jobId: '6',
    amount: 300,
    status: 'completed',
    method: 'bank',
    createdAt: '2024-01-29T14:15:00Z',
    userName: 'Ahmed Al-Rashid',
    jobTitle: 'Executive Chef'
  },
  {
    id: 'PAY-007',
    userId: '4',
    jobId: '8',
    amount: 150,
    status: 'completed',
    method: 'wallet',
    createdAt: '2024-01-30T10:00:00Z',
    userName: 'Fatima Al-Zahra',
    jobTitle: 'Customer Service Representative'
  },
  {
    id: 'PAY-008',
    userId: '6',
    jobId: '1',
    amount: 250,
    status: 'refunded',
    method: 'card',
    createdAt: '2024-01-19T15:30:00Z',
    userName: 'Omar Abdullah',
    jobTitle: 'Senior Hotel Manager'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalUsers: 2847,
  totalEmployers: 456,
  totalJobs: 127,
  monthlyRevenue: 78500,
  monthlyApplications: [145, 189, 234, 267, 298, 345, 378, 412, 456, 489, 523, 567],
  jobSectors: [
    { name: 'Hospitality', value: 42, color: '#002D62' },
    { name: 'Logistics', value: 28, color: '#00509D' },
    { name: 'Construction', value: 18, color: '#0066CC' },
    { name: 'Travel', value: 8, color: '#3399FF' },
    { name: 'Tourism', value: 4, color: '#66B2FF' }
  ],
  revenueData: [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 67000 },
    { month: 'Jun', revenue: 58000 },
    { month: 'Jul', revenue: 72000 },
    { month: 'Aug', revenue: 78500 }
  ]
};