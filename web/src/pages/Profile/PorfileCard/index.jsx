import React from 'react'
import './index.css'

function ProfileCard(props) {

  return (
    <div className="ProfileCard__card">
        {props.college?.name && <p className="ProfileCard__card-title">{props.college?.name}</p>}
        {props.college?.country && <p className="ProfileCard__card-country">Pais: {props.college?.country}</p>}
        {props.college?.domains[0] && <p className="ProfileCard__card-domain">Dominio: {props.college?.domains[0]}</p>}
        <div onClick={() => props.selectCollege(props.college)} className="ProfileCard__card-btn">See details</div>
        <div onClick={() => props.deleteCollege(props.college)} className="ProfileCard__card-btn ProfileCard__red">Delete</div>
  </div>
  )
}

export default ProfileCard