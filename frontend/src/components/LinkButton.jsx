import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkButton({ text, link, className }) {
  return (
    <Link className={`${className} outline-none text-white p-2 px-4 w-fit rounded-sm`} to={link}>{text}</Link>
  )
}
