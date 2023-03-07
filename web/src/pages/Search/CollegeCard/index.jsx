import React from 'react'
import './index.css'

function CollegeCard(props) {
  return (
    <div className="Search__card">
        <p className='CollegeCard__title'>{props.college?.name}</p>
        <p>{props.college?.country}</p>
        <p>{props.scollege?.domains[0]}</p>
        <div onClick={() => props.addCollege(props.college)} className="CollegeCard__btn">Add</div>
  </div>
  )
}

export default CollegeCard