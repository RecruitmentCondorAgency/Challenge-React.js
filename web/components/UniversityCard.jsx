import { Button } from 'primereact/button'
import React from 'react'
import { WiDaySunny } from 'weather-icons-react'
import { COUNTRIES_URL, WEATHER_URL } from '../constants'
import { useFetch } from '../hooks/useFetch'

export default function UniversityCard({ university }) {
  const { name, country, web_pages, alpha_two_code } = university
  const { data: countryData, error: countryError } = useFetch(
    `${COUNTRIES_URL}/alpha/${alpha_two_code}`,
  )
  const { latlng } = countryError ? {} : countryData || {}
  const [lat, lng] = latlng || []
  const { data: weatherData, error: weatherError } = useFetch(
    `${WEATHER_URL}&lat=${lat}&lon=${lng}`,
  ) || {}
  const currentWeather = weatherData?.dataseries[0]?.weather

  return (
    <article className='flex align-items-center justify-content-center'>
      <div className="col-12 md:col-6 lg:col-3 w-5">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">{name}</span>
              <div className='flex align-items-center'>
                <div className="text-900 font-medium text-xl mr-4">{country}</div>
                {
                  currentWeather === 'clearday' ? (<WiDaySunny size={36} color='#ffd766' />)
                    : currentWeather === 'rainday' ? (<WiDayRain size={36} color='#0b0e57' />)
                      : currentWeather === 'snowday' ? (<WiDaySnow size={36} color='#000' />)
                        : null
                }
              </div>
            </div>
            <div className="flex align-items-center justify-content-center">
              <Button
                icon="pi pi-heart"
                className="p-button-rounded p-button-help"
                aria-label="Favorite"
              />
              <Button
                icon="pi pi-arrow-up-right"
                className="p-button-rounded p-button-secondary mx-2"
                aria-label="Open External Link"
                onClick={() => window.open(web_pages[0], '_blank')}
              />
            </div>
          </div>
          <span className="text-500">
            <a href={web_pages[0]}>{web_pages[0]}</a>
          </span>
        </div>
      </div>
    </article>
  )
}
