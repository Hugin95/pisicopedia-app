import { createClient } from '@supabase/supabase-js';

// SUPABASE CLIENT - pentru browser (client-side)
// Folosește DIRECT cheile publice (e safe, sunt publice oricum)
const supabaseUrl = 'https://wvyeuudaerurvpvljmgq.supabase.co';
const supabaseAnonKey = 'sb_publishable_G41w_OvYDvb2vt1jx7hexw_WUKjR0X7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

