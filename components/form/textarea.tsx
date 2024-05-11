import React, { ChangeEvent, TextareaHTMLAttributes } from 'react'

interface Props {
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    placeholder: string
    className: string
}

export default function TextareaForm({ value, onChange, placeholder, className}: Props) {
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder} className={className} />
  )
}
