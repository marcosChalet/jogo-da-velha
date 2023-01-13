import React from 'react'

import './style.css'

function Button( {click, text='', classes='', children} ) {
  const btnClasses = `btn ${classes}`
  return (
    <button onClick={click} className={btnClasses}> {children}{text} </button>
  )
}

export default Button