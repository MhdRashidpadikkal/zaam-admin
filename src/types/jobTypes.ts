// src/types/jobTypes.ts

export interface FrontendJob {
    id: string;
    title: string;
    company: string;
    category: 'hospitality' | 'logistics' | 'construction' | 'travel' | 'tourism' | 'service';
    location: string;
    salary: string; // Combined min_salary, max_salary, currency for display
    type: 'full-time' | 'part-time' | 'contract' | 'internship'; // Mapped from job_type
    status: 'active' | 'inactive';
    applicants: number;
    createdAt: string; // Mapped from posted_time
    description: string;
    requirements: string[]; // Mapped from responsibilities
    skills?: string[]; // Optional, if you want to display skills separately
  }
  
  // Type for data fetched from Supabase (snake_case from DB)
  export interface SupabaseJobData {
    id: string; // UUID from Supabase
    created_at: string;
    title: string;
    company: string;
    location: string;
    job_type: string;
    min_salary: number | null;
    max_salary: number | null;
    currency: string;
    posted_time: string; // Typically timestamp with timezone from DB
    tags: string[]; // Assuming Supabase stores these as text[] or JSONB
    category: string;
    experience_level: string; // Add if you use this in DB
    description: string;
    responsibilities: string[]; // Assuming Supabase stores these as text[] or JSONB
    skills: string[]; // Assuming Supabase stores these as text[] or JSONB
    status: 'active' | 'inactive' | 'pause'; // Status from DB can be active, inactive, or pause
    applicants: number; // Assuming applicants count is stored directly in DB
  }
  
  // Type for data to be inserted/updated in Supabase (matches DB schema directly)
  export interface JobInsertData {
    title: string;
    company: string;
    location: string;
    job_type: string;
    min_salary: number | null;
    max_salary: number | null;
    currency: string;
    posted_time: string;
    tags: string[]; // Ensure this matches your DB column for tags
    category: string;
    experience_level?: string; // Optional for insert if it has a default in DB
    description: string;
    responsibilities: string[];
    skills: string[];
    status?: 'active' | 'inactive'; // Optional, defaults to 'active' on insert
    applicants?: number; // Optional, defaults to 0 on insert
  }
  
  /**
   * Transforms Supabase data to the frontend Job type.
   * @param supabaseJob The job data fetched from Supabase.
   * @returns A FrontendJob object.
   */
  export const transformSupabaseJobToFrontendJob = (supabaseJob: SupabaseJobData): FrontendJob => {
    return {
      id: supabaseJob.id,
      title: supabaseJob.title,
      company: supabaseJob.company,
      category: supabaseJob.category as FrontendJob['category'],
      location: supabaseJob.location,
      salary: supabaseJob.min_salary && supabaseJob.max_salary
        ? `${supabaseJob.currency} ${supabaseJob.min_salary} - ${supabaseJob.max_salary}`
        : (supabaseJob.min_salary ? `${supabaseJob.currency} ${supabaseJob.min_salary}` : 'N/A'),
      type: supabaseJob.job_type as FrontendJob['type'],
      status: supabaseJob.status === 'pause' ? 'inactive' : supabaseJob.status,
      applicants: supabaseJob.applicants,
      createdAt: supabaseJob.posted_time,
      description: supabaseJob.description,
      requirements: supabaseJob.responsibilities,
      skills: supabaseJob.skills,
    };
  };
  
  // Form data type for the JobForm component
  export interface JobFormData {
    title: string;
    company: string;
    category: string;
    location: string;
    min_salary: string;
    max_salary: string;
    currency: string;
    job_type: string;
    description: string;
    responsibilities: string; // Raw string from textarea
    skills: string; // Raw string from textarea
  }