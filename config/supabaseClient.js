import { createClient } from '@supabase/supabase-js';

// نضع الروابط مباشرة هنا للتجربة والقضاء على مشكلة الـ .env
const supabaseUrl = "https://xyvkdndcjanjzdjtcltm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5dmtkbmRjamFuanpkanRjbHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMjE1MjcsImV4cCI6MjA5Nzc5NzUyN30.HlPKpJ3EAgB6YLguTyK2djdW1UQtrLT4eB3lfz6mCjM";

export const supabase = createClient(supabaseUrl, supabaseKey);