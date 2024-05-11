import React from 'react'

interface Props  {
    className: string,
    children: React.ReactNode
}
export default function ButtonGroup({ className, children}: Props) {
  return (
    <div className={className}>
        {children}
    </div>
  )
}
