import React from 'react'

export default function Button({component: Component="button", onClick, text, startIcon, color}) {
const buttonStyle = {
    backgroundColor: color,
    color: "whitesmoke",
    height: "4rem",
    borderRadius: "1rem",
    border: "none",
    fontSize: "2rem",
}
  return (
    <Component onClick={onClick} style={buttonStyle} className="btn">
        <span className='start-icon'>{startIcon}</span>
        <span className='btn-txt'>{text}</span>
    </Component>
  )
}
