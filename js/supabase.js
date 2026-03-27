import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://jzvwfjwskejsiuypdylz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6dndmandza2Vqc2l1eXBkeWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTQxNzgsImV4cCI6MjA5MDE5MDE3OH0.InmYVnxf8q9aw5OnfwTufUTQtsdHpB2J2MD6a2hVw2o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export const ADMIN_EMAIL_DOMAIN = 'meubleconcept.com';
export const ADMIN_EMAIL = 'admin@meubleconcept.com';
