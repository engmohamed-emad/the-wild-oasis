import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://kacnbldprojrqsdujlyl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthY25ibGRwcm9qcnFzZHVqbHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODEyOTcsImV4cCI6MjA2OTQ1NzI5N30.BY8fRpuFQy51rMW0QoAvvY4P9VP40CYiJB66DxJkAzw';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase