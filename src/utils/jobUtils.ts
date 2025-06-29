// src/utils/jobUtils.ts
import { SupabaseJobData, Job } from '../types/job';

// Transform Supabase data to frontend Job type
export const transformSupabaseJobToFrontendJob = (supabaseJob: SupabaseJobData): Job => {
  return {
    id: supabaseJob.id,
    title: supabaseJob.title,
    company: supabaseJob.company,
    category: supabaseJob.category as 'hospitality' | 'logistics' | 'construction' | 'travel' | 'tourism' | 'service',
    location: supabaseJob.location,
    // Combine min_salary, max_salary, currency into single salary string for display
    salary: supabaseJob.min_salary && supabaseJob.max_salary
      ? `${supabaseJob.currency} ${supabaseJob.min_salary} - ${supabaseJob.max_salary}`
      : (supabaseJob.min_salary ? `${supabaseJob.currency} ${supabaseJob.min_salary}` : 'N/A'),
    type: supabaseJob.job_type as 'full-time' | 'part-time' | 'contract' | 'internship', // Ensure 'internship' is included
    status: supabaseJob.status === 'pause' ? 'inactive' : supabaseJob.status as 'active' | 'inactive' | 'draft', // Map 'pause' to 'inactive' for display
    applicants: supabaseJob.applicants,
    createdAt: supabaseJob.posted_time, // Map posted_time to createdAt
    description: supabaseJob.description,
    requirements: supabaseJob.responsibilities, // Map responsibilities to requirements
    skills: supabaseJob.skills,
    experience_level: supabaseJob.experience_level,
    tags: supabaseJob.tags,
  };
};

export const categories = ['all', 'hospitality', 'logistics', 'construction', 'travel', 'tourism', 'service'];

// You can add other job-related utility functions here as needed