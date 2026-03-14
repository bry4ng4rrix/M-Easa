import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://phfmudtkvvycwemqhmij.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZm11ZHRrdnZ5Y3dlbXFobWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0ODMzNzcsImV4cCI6MjA4OTA1OTM3N30.N5AOpQMQuIvLSk0ZTTUm1bmK4ocQrd-wQgT-nLUwUN0"

export const supabase = createClient(supabaseUrl, supabaseKey)