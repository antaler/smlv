import { createClient } from '@supabase/supabase-js'

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZHB0d2NibGJzanhsZXh3dmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwOTQwNTYsImV4cCI6MjAxODY3MDA1Nn0.6zi6Tw1Z2O9gwrDawcWP07wHc_vO688ZbEYi_8_RViw'
const supabase = createClient('https://mldptwcblbsjxlexwveg.supabase.co', TOKEN)

export async function logOut () {
  await supabase.auth.signOut()
}

export function waitingSession ({ setSession }) {
  return () => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }
}

export async function logIn ({ provider }) {
  return await supabase.auth.signInWithOAuth({ provider })
}
