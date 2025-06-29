import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('VITE_SUPABASE_URL is not defined in your environment variables.');
  // You might want to throw an error here in production builds:
  // throw new Error('VITE_SUPABASE_URL is not defined');
}

if (!supabaseAnonKey) {
  console.error('VITE_SUPABASE_ANON_KEY is not defined in your environment variables.');
  // You might want to throw an error here in production builds:
  // throw new Error('VITE_SUPABASE_ANON_KEY is not defined');
}

export const supabase = createClient(
  supabaseUrl!,
  supabaseAnonKey!,
  {
    auth: {
      flowType: 'pkce',          
      autoRefreshToken: true,    
      persistSession: true,      
      detectSessionInUrl: true,  
    },
  }
);