// src/hooks/useJobs.ts
import { useState, useEffect, useCallback } from 'react';
import { Job, JobUpsertData, SupabaseJobData } from '../types/job';
import { jobApi } from '../lib/api';
import { transformSupabaseJobToFrontendJob } from '../utils/jobUtils';

interface UseJobsResult {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  fetchJobs: () => Promise<void>;
  createJob: (jobData: JobUpsertData) => Promise<void>;
  updateJob: (id: string, jobData: JobUpsertData) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  toggleJobStatus: (id: string) => Promise<void>;
  clearMessages: () => void;
}

export const useJobs = (): UseJobsResult => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    clearMessages();
    try {
      const data = await jobApi.fetchAllJobs();
      const transformedJobs = data.map(transformSupabaseJobToFrontendJob);
      setJobs(transformedJobs);
    } catch (err: any) {
      console.error('Error fetching jobs:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [clearMessages]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const createJob = useCallback(async (jobData: JobUpsertData) => {
    setLoading(true);
    clearMessages();
    try {
      // Ensure required fields for insert. These will be default values if not provided.
      const jobToInsert: JobUpsertData = {
        title: jobData.title || '',
        company: jobData.company || '',
        category: jobData.category || 'service',
        location: jobData.location || '',
        min_salary: jobData.min_salary || null,
        max_salary: jobData.max_salary || null,
        currency: jobData.currency || 'INR',
        job_type: jobData.job_type || 'Full-time',
        status: jobData.status || 'pause', // Default status for new jobs (as discussed)
        applicants: jobData.applicants || 0, // Default applicants for new jobs
        posted_time: new Date().toISOString(), // Use ISO string for DB timestamp
        description: jobData.description || '',
        responsibilities: jobData.responsibilities || [],
        skills: jobData.skills || [],
        experience_level: jobData.experience_level || 'entry-level',
        tags: jobData.tags || [],
      };

      const newSupabaseJob = await jobApi.createJob(jobToInsert);
      const newFrontendJob = transformSupabaseJobToFrontendJob(newSupabaseJob);
      setJobs(prevJobs => [newFrontendJob, ...prevJobs]);
      setSuccessMessage('Job created successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error('Error creating job:', err.message);
      setError('Failed to create job: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [clearMessages]);

  const updateJob = useCallback(async (id: string, updatedJobData: JobUpsertData) => {
    setLoading(true);
    clearMessages();
    try {
      const updatedSupabaseJob = await jobApi.updateJob(id, updatedJobData);
      const updatedFrontendJob = transformSupabaseJobToFrontendJob(updatedSupabaseJob);
      setJobs(prevJobs => prevJobs.map(job =>
        job.id === id ? updatedFrontendJob : job
      ));
      setSuccessMessage('Job updated successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error('Error updating job:', err.message);
      setError('Failed to update job: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [clearMessages]);

  const deleteJob = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    clearMessages();
    try {
      await jobApi.deleteJob(id);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      setSuccessMessage('Job deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error('Error deleting job:', err.message);
      setError('Failed to delete job: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [clearMessages]);

  const toggleJobStatus = useCallback(async (id: string) => {
    setLoading(true);
    clearMessages();
    const jobToUpdate = jobs.find(job => job.id === id);
    if (!jobToUpdate) {
      setError('Job not found.');
      setLoading(false);
      return;
    }

    const newStatus = jobToUpdate.status === 'active' ? 'pause' : 'active'; // Toggle between 'active' and 'pause'
    try {
      const updatedSupabaseJob = await jobApi.updateJobStatus(id, newStatus);
      // Map the returned supabase status to frontend status for local state
      const updatedFrontendJobStatus = updatedSupabaseJob.status === 'pause' ? 'inactive' : updatedSupabaseJob.status;
      setJobs(prevJobs => prevJobs.map(job =>
        job.id === id
          ? { ...job, status: updatedFrontendJobStatus } // Update local state with frontend status
          : job
      ));
      setSuccessMessage('Job status updated!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error('Error updating job status:', err.message);
      setError('Failed to update job status: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [jobs, clearMessages]);

  return {
    jobs,
    loading,
    error,
    successMessage,
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    toggleJobStatus,
    clearMessages,
  };
};