import { createClient } from '@supabase/supabase-js';

// Supabase client pentru server-side operations (folosește service_role key)
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Supabase client pentru client-side operations (folosește anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wvyeuudaerurvpvljmgq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_G41w_OvYDvb2vt1jx7hexw_WUKjR0X7'
);

// TypeScript types pentru articole
export interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  keywords: string[] | null;
  created_at: string;
  published: boolean;
}

