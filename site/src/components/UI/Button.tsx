import { FC, ReactNode } from 'react'

export const Button: FC<{
  children: ReactNode
  white?: boolean
}> = ({ children, white }) => {
  return (
    <div
      className={`p-2 cursor-pointer px-4 inline-block border-2 hover:shadow-lg ${
        white ? 'border-white' : 'border-[#030303]'
      }`}
    >
      {children}
    </div>
  )
}
