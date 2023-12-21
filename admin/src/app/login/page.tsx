import { PrismaClient } from '@prisma/client'
import { NextPage } from 'next'

const getUsers = async () => {
  const prismaClient = new PrismaClient()
  return await prismaClient.user.findMany()
}

const LoginPage: NextPage = async () => {
  const users = await getUsers()
  return (
    <>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </>
  )
}

export default LoginPage
