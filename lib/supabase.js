import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cyworhullhtvubrfyzze.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5d29yaHVsbGh0dnVicmZ5enplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjE5MTMwOCwiZXhwIjoyMDI3NzY3MzA4fQ.ZczAdmxZqH3yA-E7BOOL5a6oJbxVdMq2pgTIOajri5g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
