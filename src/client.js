
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ufxhnacgasklyhhiqbvf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmeGhuYWNnYXNrbHloaGlxYnZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDk4MTExNywiZXhwIjoxOTk2NTU3MTE3fQ.QidP58kHEa7SNqjNPCVdr-VSmdzIhL8MAgsqj44PQKM'
export const supabase = createClient(supabaseUrl, supabaseKey)