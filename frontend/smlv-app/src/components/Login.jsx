import { useContext, useEffect } from 'react'
import { GitHubIcon, DiscordIcon } from './Icons'
import { sessionContext } from '../context/session'
import { logIn, waitingSession } from '../services/supabase'

function GithubButton ({ handleClick }) {
  return (
    <button
      type='button'
      className='text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30'
      onClick={handleClick}
    >
      <GitHubIcon />
    </button>
  )
}

function DiscordButton ({ handleClick }) {
  return (
    <button
      type='button'
      className='text-white bg-[#5865F2] hover:bg-[#5865F2]/90 focus:ring-4 focus:outline-none focus:ring-[#5865F2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#5865F2]/30'
      onClick={handleClick}
    >
      <DiscordIcon />
    </button>
  )
}

export function Login () {
  const { setSession } = useContext(sessionContext)
  useEffect(waitingSession({ setSession }), [])
  const handleClick = ({ provider }) => () => logIn({ provider })

  return (
    <nav className='flex flex-row gap-2 items-center'>
      <GithubButton handleClick={handleClick({ provider: 'github' })} />
      <DiscordButton handleClick={handleClick({ provider: 'discord' })} />
    </nav>
  )
}
