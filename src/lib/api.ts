// src/lib/api.ts
import { supabase } from './supabaseClient';
import { SupabaseJobData, JobUpsertData } from '../types/job';

export const jobApi = {
  async fetchAllJobs(): Promise<SupabaseJobData[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_time', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createJob(jobData: JobUpsertData): Promise<SupabaseJobData> {
    const { data, error } = await supabase
      .from('jobs')
      .insert([jobData])
      .select();

    if (error) throw error;
    if (!data || data.length === 0) throw new Error('Failed to create job: No data returned.');
    return data[0];
  },

  async updateJob(id: string, jobData: JobUpsertData): Promise<SupabaseJobData> {
    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) throw new Error('Failed to update job: No data returned.');
    return data[0];
  },

  async deleteJob(id: string): Promise<void> {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateJobStatus(id: string, status: 'active' | 'inactive' | 'pause'): Promise<SupabaseJobData> {
    const { data, error } = await supabase
      .from('jobs')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) throw new Error('Failed to update job status: No data returned.');
    return data[0];
  },
};