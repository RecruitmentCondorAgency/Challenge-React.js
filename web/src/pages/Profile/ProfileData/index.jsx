import React from 'react'
import './index.css'

function ProfileData(props) {
  return (
    <div className="ProfileData__box">
        <p className="ProfileData__title">Data</p>
        {props.selected.name &&<p className="">{props.selected.name}</p>}
        <p className="">{props.selected.country && props.selected.country} {props.selected.alpha_two_code && "(" + props.selected.alpha_two_code + ")"}</p>
        {props.selected.web_pages &&<p className=""><a href="http://{selected.web_pages[0]}">{props.selected.web_pages[0]}</a></p>}
    </div>
    
  )
}

export default ProfileData