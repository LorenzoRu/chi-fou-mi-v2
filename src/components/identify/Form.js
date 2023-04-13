import React from 'react'

export default function Form({onSubmit}) {
  return (
    <form onSubmit={onSubmit}> 
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type='password' name='password'/>
        <input type='submit' value='Confirmer' />
    </form>
  )
}
