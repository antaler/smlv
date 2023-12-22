import back from '../assets/logo-back.webp'
export function Home () {
  return (
    <main className='w-full md:max-w-screen-md md:m-auto'>
      <section className='h-[200px] flex flex-row items-center justify-between'>
        <div className='font-geist text-slate-200 pl-5'>
          <h1 className='text-5xl'>Smartlive</h1>
          <h2 className='text-1xl pl-1'> Manage your inventory </h2>
        </div>
        <picture className='w-36 mr-5'>
          <img src={back} alt='back image' className='rounded-full' />
        </picture>
      </section>
    </main>
  )
}
