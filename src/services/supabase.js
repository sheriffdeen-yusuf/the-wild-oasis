import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://unejjdbzadqyijqivwqb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZWpqZGJ6YWRxeWlqcWl2d3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1MTI0ODMsImV4cCI6MjAxMjA4ODQ4M30.HD-YYGXC8iYBE1H-ojyAIOKuiJ6mBmLn0w6dNW7HfvM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
