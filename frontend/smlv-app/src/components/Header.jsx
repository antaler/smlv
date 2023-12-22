import { useContext, useState } from 'react'
import { Login } from './Login'
import { sessionContext } from '../context/session'
import { IconMenuClose, IconMenuOpen, SmlvIcon } from './Icons'
import { AvatarMenu } from './Avatar'
import { Link } from 'wouter'

export function Header () {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { session, logOut } = useContext(sessionContext)

  const avatarUrl = session?.user?.user_metadata?.avatar_url
  return (
    <header className='w-full absolute top-0 p-2 bg-transparent flex flex-row border-b-[1px] z-50 border-b-primary justify-between items-center shadow-sm shadow-primary'>
      <div className='flex flex-row items-center gap-1'>
        {session !== null && (
          <picture className='cursor-pointer' onClick={() => setMenuIsOpen(!menuIsOpen)}>
            {menuIsOpen ? <IconMenuOpen /> : <IconMenuClose />}
          </picture>
        )}
        <Link href='/'> <SmlvIcon /></Link>
      </div>
      {
        session === null ? <Login /> : <AvatarMenu avatarUrl={avatarUrl} logOut={logOut} />
      }
    </header>
  )
}
