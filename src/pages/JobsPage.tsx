// src/pages/JobsPage.tsx
import React, { useState } from 'react';
import { Plus, Search, Filter, Users, Calendar } from 'lucide-react';
import { Job } from '../types/job';
import { useJobs } from '../hooks/useJobs';
import { JobFormModal } from '../components/jobs/JobFormModal';
import { JobDetailsModal } from '../components/jobs/JobDetailsModal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { categories } from '../utils/jobUtils'; // Import categories from utils
import { JobCard } from '../components/jobs/JobCard';

export const JobsPage: React.FC = () => {
  const {
    jobs,
    loading,
    error,
    successMessage,
    createJob,
    updateJob,
    deleteJob,
    toggleJobStatus,
    clearMessages,
  } = useJobs();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const jobStats = {
    total: jobs.length,
    active: jobs.filter(j => j.status === 'active').length,
    inactive: jobs.filter(j => j.status === 'inactive').length, // This will count frontend 'inactive'
    paused: jobs.filter(j => j.status === 'inactive').length, // In frontend, 'pause' is mapped to 'inactive' so this counts the same as inactive
    totalApplications: jobs.reduce((sum, job) => sum + job.applicants, 0),
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const openEditModal = (job: Job) => {
    clearMessages();
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingJob(null);
  };

  if (loading && jobs.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && jobs.length === 0) {
    return <div className="text-center py-12 text-red-600 text-lg">Error: {error}</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => clearMessages()}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.103l-2.651 3.746a1.2 1.2 0 1 1-1.697-1.697l3.746-2.651-3.746-2.651a1.2 1.2 0 0 1 1.697-1.697l2.651 3.746 2.651-3.746a1.2 1.2 0 0 1 0 1.697z"/></svg>
          </span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => clearMessages()}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.103l-2.651 3.746a1.2 1.2 0 1 1-1.697-1.697l3.746-2.651-3.746-2.651a1.2 1.2 0 0 1 1.697-1.697l2.651 3.746 2.651-3.746a1.2 1.2 0 0 1 0 1.697z"/></svg>
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Job Management</h1>
          <p className="text-gray-600 mt-2">Manage job postings and track applications</p>
        </div>
        <button
          onClick={() => { clearMessages(); setIsCreateModalOpen(true); }}
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
              <Plus className="h-6 w-6 text-white" /> {/* Changed icon to Plus for Total Jobs */}
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
              <Calendar className="h-6 w-6 text-white" /> {/* Changed icon to Calendar for Active Jobs */}
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
            <div className="bg-orange-500 p-3 rounded-xl">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Paused/Inactive Jobs</p> {/* Combined paused/inactive */}
              <p className="text-2xl font-bold text-gray-900">{jobStats.paused}</p>
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
          <JobCard
            key={job.id}
            job={job}
            onView={(j) => { clearMessages(); setSelectedJob(j); }}
            onEdit={openEditModal}
            onToggleStatus={toggleJobStatus}
            onDelete={deleteJob}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && !loading && !error && (
        <div className="text-center py-12 gradient-card rounded-2xl">
          <div className="text-gray-500 text-lg">No jobs found matching your criteria.</div>
          <button
            onClick={() => { clearMessages(); setIsCreateModalOpen(true); }}
            className="mt-4 gradient-primary text-white px-6 py-3 rounded-xl hover:gradient-secondary gradient-hover"
          >
            Create Your First Job
          </button>
        </div>
      )}

      <JobFormModal
        isOpen={isCreateModalOpen}
        onClose={() => { clearMessages(); setIsCreateModalOpen(false); }}
        onSubmit={createJob}
        title="Create New Job"
        initialData={null}
      />

      {editingJob && (
        <JobFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={(jobData) => updateJob(editingJob.id, jobData)}
          title="Edit Job"
          initialData={editingJob}
        />
      )}

      <JobDetailsModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </div>
  );
};