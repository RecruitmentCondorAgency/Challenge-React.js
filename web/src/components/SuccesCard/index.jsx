import React from 'react'

import './index.css'

function SuccesCard(props) {
  return (
    <div className='SuccessCard__container'>{props.msg}</div>
  )
}

export default SuccesCard