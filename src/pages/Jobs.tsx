import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, MapPin, DollarSign, Users, Calendar } from 'lucide-react';
import { StatusBadge } from '../components/UI/StatusBadge';
import { Modal } from '../components/UI/Modal';
import { mockJobs } from '../utils/mockData';
import { Job } from '../types';

export const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'hospitality', 'logistics', 'construction', 'travel', 'tourism', 'service'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateJob = (jobData: Partial<Job>) => {
    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      title: jobData.title || '',
      company: jobData.company || '',
      category: jobData.category || 'service',
      location: jobData.location || '',
      salary: jobData.salary || '',
      type: jobData.type || 'full-time',
      status: 'active',
      applicants: 0,
      createdAt: new Date().toISOString(),
      description: jobData.description || '',
      requirements: jobData.requirements || []
    };
    setJobs([newJob, ...jobs]);
    setIsCreateModalOpen(false);
  };

  const toggleJobStatus = (id: string) => {
    setJobs(jobs.map(job => 
      job.id === id 
        ? { ...job, status: job.status === 'active' ? 'inactive' : 'active' }
        : job
    ));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const jobStats = {
    total: jobs.length,
    active: jobs.filter(j => j.status === 'active').length,
    inactive: jobs.filter(j => j.status === 'inactive').length,
    totalApplications: jobs.reduce((sum, job) => sum + job.applicants, 0)
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Job Management</h1>
          <p className="text-gray-600 mt-2">Manage job postings and track applications</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white gradient-primary hover:gradient-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 gradient-hover"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="gradient-card p-6 rounded-2xl gradient-hover">
          <div className="flex items-center">
            <div className="gradient-primary p-3 rounded-xl">
              <Trash2 className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobStats.total}</p>
            </div>
          </div>
        </div>
        <div className="gradient-card p-6 rounded-2xl gradient-hover">
          <div className="flex items-center">
            <div className="gradient-secondary p-3 rounded-xl">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobStats.active}</p>
            </div>
          </div>
        </div>
        <div className="gradient-card p-6 rounded-2xl gradient-hover">
          <div className="flex items-center">
            <div className="gradient-accent p-3 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{jobStats.totalApplications}</p>
            </div>
          </div>
        </div>
        <div className="gradient-card p-6 rounded-2xl gradient-hover">
          <div className="flex items-center">
            <div className="bg-gray-500 p-3 rounded-xl">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobStats.inactive}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="gradient-card p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Jobs</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 gradient-hover"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 gradient-hover"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full gradient-primary text-white px-4 py-3 rounded-xl hover:gradient-secondary gradient-hover flex items-center justify-center">
              <Filter className="h-5 w-5 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="gradient-card p-6 rounded-2xl gradient-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-gray-600 text-sm">{job.company}</p>
              </div>
              <StatusBadge status={job.status} />
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                {job.salary}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                {job.applicants} applicants
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gradient-primary text-white capitalize">
                {job.category}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedJob(job)}
                className="flex-1 gradient-card text-gray-700 px-3 py-2 rounded-lg hover:gradient-primary hover:text-white gradient-hover text-sm font-medium flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </button>
              <button className="flex-1 gradient-secondary text-white px-3 py-2 rounded-lg hover:gradient-accent gradient-hover text-sm font-medium flex items-center justify-center">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => toggleJobStatus(job.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium gradient-hover ${
                  job.status === 'active' 
                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {job.status === 'active' ? 'Pause' : 'Activate'}
              </button>
              <button
                onClick={() => deleteJob(job.id)}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 gradient-hover"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 gradient-card rounded-2xl">
          <div className="text-gray-500 text-lg">No jobs found matching your criteria.</div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 gradient-primary text-white px-6 py-3 rounded-xl hover:gradient-secondary gradient-hover"
          >
            Create Your First Job
          </button>
        </div>
      )}

      {/* Create Job Modal */}
      <JobModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateJob}
        title="Create New Job"
      />

      {/* Job Details Modal */}
      {selectedJob && (
        <Modal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title="Job Details"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <p className="text-lg font-semibold text-gray-900">{selectedJob.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <p className="text-lg font-semibold text-gray-900">{selectedJob.company}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium gradient-primary text-white capitalize">
                  {selectedJob.category}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="text-sm text-gray-900">{selectedJob.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <p className="text-sm text-gray-900">{selectedJob.salary}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
              <div className="gradient-card p-4 rounded-xl">
                <p className="text-gray-900">{selectedJob.description}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
              <div className="gradient-card p-4 rounded-xl">
                <ul className="list-disc list-inside space-y-1">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="text-gray-900">{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applications</label>
                <p className="text-2xl font-bold text-gray-900">{selectedJob.applicants}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posted Date</label>
                <p className="text-sm text-gray-900">{new Date(selectedJob.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const JobModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Job>) => void;
  title: string;
}> = ({ isOpen, onClose, onSubmit, title }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: 'service',
    location: '',
    salary: '',
    type: 'full-time',
    description: '',
    requirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      requirements: formData.requirements.split('\n').filter(req => req.trim())
    });
    setFormData({
      title: '', company: '', category: 'service', location: '', 
      salary: '', type: 'full-time', description: '', requirements: ''
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., Senior Hotel Manager"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., Grand Resort Hotels"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            >
              <option value="hospitality">Hospitality</option>
              <option value="logistics">Logistics</option>
              <option value="construction">Construction</option>
              <option value="travel">Travel</option>
              <option value="tourism">Tourism</option>
              <option value="service">Service</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., Dubai, UAE"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
            <input
              type="text"
              required
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., AED 15,000 - 20,000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            placeholder="Describe the job role, responsibilities, and what you're looking for..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Requirements (one per line)</label>
          <textarea
            rows={4}
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            placeholder="5+ years experience&#10;Bachelor's degree in relevant field&#10;Strong communication skills&#10;Fluent in English and Arabic"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 gradient-hover"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white gradient-primary hover:gradient-secondary gradient-hover"
          >
            Create Job
          </button>
        </div>
      </form>
    </Modal>
  );
};