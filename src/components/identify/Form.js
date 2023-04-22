import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Form({onSubmit, error}) {
  return (
    <form onSubmit={onSubmit}>
        <label>Username</label>
        <input type="text" name="username" id="username" />
        <label>Password</label>
        <input type='password' name='password'/>
        <div className='error'>
          {error && <FontAwesomeIcon icon={faExclamationCircle} />}
           <p className='error-txt'>{error}</p>
        </div>
       
        <input type='submit' value='Confirmer' />
    </form>
  )
}
