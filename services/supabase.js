import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://onxvdbyachwukuyvnhyx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueHZkYnlhY2h3dWt1eXZuaHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTcwNzcsImV4cCI6MjA3OTkzMzA3N30.2OI51nMS4bMq1Tedfc7lib4IAh8UjsStlhz0lxqOmRw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);