import { FC, ReactNode } from 'react'

export const Button: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <div className="p-2 cursor-pointer px-4 inline-block border-2 hover:shadow-lg border-[#030303]">
      {children}
    </div>
  )
}
