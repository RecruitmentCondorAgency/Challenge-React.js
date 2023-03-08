import React from 'react'
import './index.css'

import clear from '../../../assets/img/clear.png'
import rain from '../../../assets/img/rain.png'
import snow from '../../../assets/img/snow.png'

import { toHoursAndMinutes } from '../../../utils/utils'

function ProfileData(props) {
  console.log(props.country)
  console.log(props.weather)
  return (
    <div className="ProfileData__box">
        {props.selected.name &&<p className="">{props.selected.name}</p>}
        <p className="">Location: {props.selected.country && props.selected.country} {props.selected.alpha_two_code && "(" + props.selected.alpha_two_code + ")"}</p>
        
        {props.country && <>
          <p className=''>Region: {props.country.region && props.country.region} {props.country.subregion && <span> - {props.country.subregion}</span>}</p>
          <p className=''>Start of the week: {props.country.startOfWeek && props.country.startOfWeek}</p>
          {props.country.timezones && 
          <>
          Time zones:
            <ul>
              {props.country.timezones.map((time) => <p>{time}</p>)}
            </ul>
          </>}
        </>}


        {props.selected.domains && 
          <>
          Domains:
            <ul>
              {props.selected.domains.map((domain) => <p>{domain}</p>)}
            </ul>
          </>}
        {props.selected.web_pages && 
          <>
            <p>Websites:</p>
              <ul>
                {props.selected.web_pages.map((web)=><li><a href={`${web}`}>{web}</a></li>)}
              </ul>

          </>}

        {props.weather && 
          <>
            <p>Weather for the day:</p>
                {props.weather.dataseries.map((item)=>{
                  if (item.timepoint <= 24 ){
                    return (
                      <div className='WeatherCard__conatiner'>
                        <p>Next {item.timepoint} Hours:</p>
                        {item.prec_type === "none" && <img src={clear} alt="clear"/>}
                        {item.prec_type === "rain" && <img src={rain} alt="rain"/>}
                        {item.prec_type === "snow" && <img src={snow} alt="snow"/>}
                        <p>{item.temp2m} °C</p>
                    </div>)
                  }
                })}
          </>}
    </div>
    
  )
}

export default ProfileData