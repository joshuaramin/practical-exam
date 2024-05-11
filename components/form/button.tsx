import React from 'react'

interface Props  {
    onClick?: () => void
    className: string
    textClassName: string
    name: string
    type?: 'submit' | 'button'
}
export default function ButtonForm({ onClick, type,  className, textClassName, name }: Props) {
  return (
    <button  type={type} className={className} onClick={onClick}>
        <span className={textClassName} >{name}</span>
    </button>
  )
}
