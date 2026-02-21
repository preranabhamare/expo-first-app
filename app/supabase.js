import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://zjujldtbfzzuqvepyskn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqdWpsZHRiZnp6dXF2ZXB5c2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NjM2MzQsImV4cCI6MjA4NzIzOTYzNH0.uvNVRY4dChgEYI7B-M43WuhmspveHuesmQNgyJ7r1Bs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});