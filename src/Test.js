import React from 'react'
import Button from './components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCake } from '@fortawesome/free-solid-svg-icons'

export default function Test() {
  return (
    <div>
      <h1>Test</h1>
      <Button text={"Se déconnecter"} color={"var(--color-tertiary)"} startIcon={<FontAwesomeIcon icon={faCake}/>}/>
    </div>
  )
}
