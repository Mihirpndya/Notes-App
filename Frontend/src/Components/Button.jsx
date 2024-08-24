import React from 'react'

const Button = ({label,onClick}) => {
  return (
    <button onClick={onClick} className='p-2 w-full bg-black text-white rounded-md mt-4'>{label}</button>
  )
}

export default Button;