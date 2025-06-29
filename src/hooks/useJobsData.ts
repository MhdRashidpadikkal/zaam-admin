// src/hooks/useJobsData.ts
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient'; // Ensure this path is correct
import { FrontendJob, SupabaseJobData, JobInsertData, transformSupabaseJobToFrontendJob } from '../types/jobTypes';

interface UseJobsDataResult {
  jobs: FrontendJob[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  fetchJobs: () => Promise<void>;
  createJob: (jobData: Partial<JobInsertData>) => Promise<void>;
  updateJob: (id: string, jobData: Partial<JobInsertData>) => Promise<void>;
  toggleJobStatus: (id: string) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  clearMessages: () => void;
}

export const useJobsData = (): UseJobsDataResult => {
  const [jobs, setJobs] = useState<FrontendJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    setSuccessMessage(null);
    setError(null);
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    clearMessages();
    try {
      const { data, error: supabaseError } = await supabase
        .from('jobs')
        .select('*')
        .order('posted_time', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      if (data) {
        const transformedJobs = data.map(transformSupabaseJobToFrontendJob);
        setJobs(transformedJobs);
      }
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

  const createJob = async (jobData: Partial<JobInsertData>) => {
    setLoading(true);
    clearMessages();
    try {
      const jobToInsert: JobInsertData = {
        title: jobData.title || '',
        company: jobData.company || '',
        category: jobData.category || 'service',
        location: jobData.location || '',
        min_salary: jobData.min_salary || null,
        max_salary: jobData.max_salary || null,
        currency: jobData.currency || 'USD',
        job_type: jobData.job_type || 'Full-time',
        status: 'active', // Default status for new jobs
        applicants: 0, // Default applicants for new jobs
        posted_time: new Date().toISOString(),
        description: jobData.description || '',
        responsibilities: jobData.responsibilities || [],
        tags: jobData.tags || [], // Ensure tags are handled if your DB uses them
        skills: jobData.skills || [],
        experience_level: jobData.experience_level || 'entry-level', // Default or fetch from form
      };

      const { data, error: supabaseError } = await supabase
        .from('jobs')
        .insert([jobToInsert])
        .select();

      if (supabaseError) {
        throw supabaseError;
      }

      if (data && data.length > 0) {
        const newFrontendJob = transformSupabaseJobToFrontendJob(data[0] as SupabaseJobData);
        setJobs(prevJobs => [newFrontendJob, ...prevJobs]);
        setSuccessMessage('Job created successfully!');
      }
    } catch (err: any) {
      console.error('Error creating job:', err.message);
      setError('Failed to create job: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id: string, jobData: Partial<JobInsertData>) => {
    setLoading(true);
    clearMessages();
    try {
      const { error: supabaseError } = await supabase
        .from('jobs')
        .update(jobData) // Directly update with jobData
        .eq('id', id);

      if (supabaseError) {
        throw supabaseError;
      }

      // Re-fetch or manually update state based on preference. Re-fetching is simpler for complex updates.
      await fetchJobs();
      setSuccessMessage('Job updated successfully!');
    } catch (err: any) {
      console.error('Error updating job:', err.message);
      setError('Failed to update job: ' + err.message);
    } finally {
      setLoading(false);
    }
  };


  const toggleJobStatus = async (id: string) => {
    setLoading(true);
    clearMessages();
    const jobToUpdate = jobs.find(job => job.id === id);
    if (!jobToUpdate) {
      setError('Job not found.');
      setLoading(false);
      return;
    }

    const newStatus = jobToUpdate.status === 'active' ? 'inactive' : 'active';
    try {
      const { error: supabaseError } = await supabase
        .from('jobs')
        .update({ status: newStatus })
        .eq('id', id);

      if (supabaseError) {
        throw supabaseError;
      }

      setJobs(prevJobs => prevJobs.map(job =>
        job.id === id
          ? { ...job, status: newStatus }
          : job
      ));
      setSuccessMessage(`Job status changed to ${newStatus}!`);
    } catch (err: any) {
      console.error('Error updating job status:', err.message);
      setError('Failed to update job status: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    clearMessages();
    try {
      const { error: supabaseError } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (supabaseError) {
        throw supabaseError;
      }

      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      setSuccessMessage('Job deleted successfully!');
    } catch (err: any) {
      console.error('Error deleting job:', err.message);
      setError('Failed to delete job: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    loading,
    error,
    successMessage,
    fetchJobs,
    createJob,
    updateJob,
    toggleJobStatus,
    deleteJob,
    clearMessages,
  };
};