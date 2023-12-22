import { useState } from 'react'
import { Link, useLocation } from 'wouter'

function Avatar ({ avatarUrl, onClick }) {
  return (
    <picture className='grid place-items-center' onClick={onClick}>
      <img className='w-11 h-11  rounded-full cursor-pointer aspect-square' src={avatarUrl} alt='User avatar' />
    </picture>
  )
}

export function AvatarMenu ({ avatarUrl, logOut }) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleIsVisible = () => setIsVisible(!isVisible)
  const [, setLocation] = useLocation()
  const onClick = async () => {
    setIsVisible(false)
    await logOut()
    setLocation('/')
  }
  return (
    <div className='grid place-items-center relative overflow-visible'>
      <Avatar avatarUrl={avatarUrl} onClick={toggleIsVisible} />
      {
        isVisible && (
          <div className='absolute z-10 top-full bg-second/90 w-36 right-0 rounded-md'>
            <ul className=' text-center '>
              <li
                className='cursor-pointer border-b-[1px] border-b-second/80  hover:bg-slate-600/15 rounded-t-md ' onClick={() => setIsVisible(false)}
              >
                <Link href='/profile' className='w-full h-full block py-2'> My Profile</Link>
              </li>
              <li className='cursor-pointer  py-2  border-b-second/80  hover:bg-slate-600/15 rounded-t-md' onClick={onClick}>
                Sign out
              </li>
            </ul>
          </div>)
      }
    </div>
  )
}
