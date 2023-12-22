import { createContext, useState } from 'react'
import { logOut } from '../services/supabase'

export const sessionContext = createContext(null)

export function SessionProvider ({ children }) {
  const [session, setSession] = useState(null)

  const logout = async () => {
    await logOut()
    setSession(null)
  }
  return (
    <sessionContext.Provider value={{
      session,
      setSession,
      logOut: logout
    }}
    >
      {children}
    </sessionContext.Provider>
  )
}
