import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Form from './Form';

export default function Register() {
  const { register } = useContext(AuthContext);
    const [error, setError] = useState(null)
    function handleRegister(e) {
        e.preventDefault()
        const data = Object.values(Object.fromEntries(new FormData(e.target)));
        register(...data).catch((err) => { 
            setError(err.message)
        })
    }
  return (
    <>
    <Form onSubmit={handleRegister} />
    {error && <p>{error}</p>}
    </>
  )
}
