import React, { ChangeEvent } from 'react'

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type: string
    placeholder: string
    value: string
    className: string
}
export default function InputForm({ onChange,  placeholder, type, value, className}: Props) {
  return (
    <input className={className} type={type} onChange={onChange} value={value} placeholder={placeholder} />
  )
}
