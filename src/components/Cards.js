import React from 'react'

export default function Cards({onClick, move, color, bgColor}) {
    const cardStyle = {
        height: "230px",
        width: "155.3px",
        backgroundColor: bgColor,
        display: "grid",
        placeItems: "center",
        borderRadius: "2.5rem",
        boxShadow: "2.5px 3px 6px rgba(0,0,0,0.5)",
    }
    const cardContainerStyle = {
        height: "213.3px",
        width: "144px",
        color: color,
        border: "6px solid var(--color-secondary)",
        display: "grid",
        placeItems: "center",
        borderRadius: "2.5rem",
        fontSize: "5.5rem",
    }
  return (
    <div style={cardStyle} onClick={onClick} className='card'>
        <div style={cardContainerStyle }>
            <span>{move}</span>
        </div>
    </div>
  )
}