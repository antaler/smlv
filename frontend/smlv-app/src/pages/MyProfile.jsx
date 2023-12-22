import { useContext, useEffect, useState } from 'react'
import { sessionContext } from '../context/session'

export function MyProfile () {
  const { session } = useContext(sessionContext)
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    if (session !== null) {
      console.log(session.user)
      const { user } = session
      const { user_metadata: userMetadata } = user
      const { avatar_url: avatarUrl, email, full_name: fullName, user_name: username } = userMetadata

      setUserData({
        avatarUrl, email, fullName, username
      })
    }
  }, [session])
  return (
    <>
      {userData &&
        <main className='w-full md:max-w-screen-md md:m-auto'>
          <h1 className='font-geist w-full text-center text-slate-200 text-4xl p-4 mb-10'>Hi! {userData.username} 👋</h1>
          <section className='grid grid-cols-1'>
            <article>
              <picture className='w-full grid place-items-center'>
                <img className='w-40 rounded-full  border-2 border-slate-200/40' src={userData.avatarUrl} alt='avatar image' />
              </picture>
            </article>
            <article className='grid place-items-center mt-10'>
              <div className='w-1/2'>
                <h2 className='text-2xl text-slate-200'>Username</h2>
                <p className='text-lg text-slate-200 px-2'>{userData.username}</p>
              </div>
            </article>
            <article className='grid place-items-center mt-5'>
              <div className='w-1/2'>
                <h2 className='text-2xl text-slate-200'>Full Name</h2>
                <p className='text-lg text-slate-200 px-2'>{userData.fullName}</p>
              </div>
            </article>
            <article className='grid place-items-center mt-5'>
              <div className='w-1/2'>
                <h2 className='text-2xl text-slate-200'>Email</h2>
                <p className='text-lg text-slate-200 px-2'>{userData.email}</p>
              </div>
            </article>
          </section>
        </main>}
    </>
  )
}
