import DarkModeButton from '@/components/DarkModeButton'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  
}

const page = async({}) => {
  const session = await getServerSession(authOptions)
  if(!session) notFound()

  return (
    <main className='pt-8'>
      <h1 className="font-bold text-5xl mb-8">Settings</h1>

      <DarkModeButton />
    </main>
  )
}

export default page