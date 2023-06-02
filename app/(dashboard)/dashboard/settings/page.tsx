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
    <div>Settings</div>
  )
}

export default page