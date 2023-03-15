import React from 'react'
import './index.css'

function ErrorCard(props) {
  return (
    <div className='ErrorCard__container'>
        {props.msg}
    </div>
  )
}

export default ErrorCard