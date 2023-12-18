import { useState } from 'preact/hooks'
import './Button.sass'
import { login as doLogin } from '../services/login'
import { ToastContainer } from 'react-toastify'
export function ButtonLogin ({ children, redirectLogin, login }) {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = async () => {
    const { value: username } = document.getElementById('username')
    const { value: password } = document.getElementById('password')
    if (!username || !password) {
      return
    }
    document.getElementById('username').value = ''
    document.getElementById('password').value = ''
    console.log({ username, password })
    setIsLoading(true)
    const { isOk, token } = await doLogin(login, { username, password })
    setIsLoading(false)
    if (isOk) {
      window.sessionStorage.setItem('_tkl', token)
      window.location.href = redirectLogin
    }
  }
  if (isLoading) {
    return (
      <>
        <div className=' loader w-full h-10 flex flex-row items-center justify-center gap-5'>
          <div className='w-7 h-7 rounded-full bg-accent' />
          <div className='w-7 h-7 rounded-full bg-accent' />
          <div className='w-7 h-7 rounded-full bg-accent' />
        </div>
        <ToastContainer />
      </>
    )
  }
  return (
    <>
      <button
        disabled={isLoading}
        className=' w-1/2 text-xl shadow-md rounded-lg px-4 py-2 bg-primary text-white'
        type='button' onClick={onClick}
      >{children}
      </button>
      <ToastContainer />
    </>
  )
}
