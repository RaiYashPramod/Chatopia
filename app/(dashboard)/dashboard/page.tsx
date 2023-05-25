import Button from '@/components/ui/Button'
import { authOptions } from '@/lib/auth'
import { FC } from 'react'


const page = async ({}) => {

  const session = await getServerSession(authOptions)

  return <Button>page</Button>
}

export default page