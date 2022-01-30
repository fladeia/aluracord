import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zvclbplibmpvksrkfwcf.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4MDM4OCwiZXhwIjoxOTU4ODU2Mzg4fQ.hYLGR67NDdaTdednlqpT3Thywxa08WdANQ5Wzv75AnY'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const SupabaseSelect = async setMessageList => {
  const { data, error } = await supabaseClient
    .from('messages')
    .select()
    .order('id', { ascending: false })
  setMessageList(data)
  console.log(`Error - select supabase:  ${error}`)
}

export const SupabaseInsert = async message => {
  const { data, error } = await supabaseClient
    .from('messages')
    .insert([message])
  console.log(`Error - insert supabase:  ${error}`)
}

export const SupabaseDelete = async id => {
  const { data, error } = await supabaseClient
    .from('messages')
    .delete()
    .match({ id: id })
  console.log(`Error - delete supabase:  ${error}`)
}
