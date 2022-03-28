import useCountryInfo from "../../hooks/useCountryInfo"
import { SelectedUniversity } from "../../store/user/types"
import Card from "../Card"
import Spinner from "../Spinner"
import './UniversityDetail.scss'

type Props = {item: SelectedUniversity}

const UniversityDetail = (props: Props) => {
  const {item} = props
  const [countryInfo, loading] = useCountryInfo(item)

  return (
    <div className="detail-container">
      <Card>
          {
            loading ?
            <div className="loader">
              <Spinner></Spinner>
            </div> :
            <>
              <h3 className="detail-title">{item.name}</h3>
              <p>
                {item.description}
              </p>
              {
                countryInfo &&
                <>
                <ul className="detail-list">
                  <li>
                    Website: <a href={item.web_pages[0]} target="_blank" rel="noopener noreferrer">{item.web_pages[0]}</a>
                  </li>
                  <li>
                    Location: {item.country}{
                      item["state-province"] && `, ${item["state-province"]}`
                    }
                  </li>
                  <li>
                    Country's capital: {countryInfo?.capital[0]}
                  </li>
                  <li>
                    Currency: {
                      countryInfo?.currencies.map((item: any, i: number, length: number) => (
                        `${item.data.name} (${item.code})${(i !== length - 1) && ', ' }`
                      ))
                    }
                  </li>
                  <li>
                    Languages: {
                      countryInfo?.languages.map((item: any, i: number, length: number) => (
                        `${item.data} (${item.code})${(i !== length - 1) && ', ' }`
                      ))
                    }
                  </li>
                  <li>
                    Population: {
                      countryInfo?.population
                    }
                  </li>
                </ul>
                <h4>Weather description</h4>
                <p>
                  At the moment, with a temperature of {countryInfo.weather.temp2m} and a precipitation amount {countryInfo.weather.prec_amount},
                  we have a {countryInfo.weather.prec_type_description} in the region in general, 
                  so you {
                    countryInfo.weather.prec_type !== 'none' ? 
                    'might want to wait at home until the weather changes' :
                    'can go around without any problem'
                  }.
                </p>
                </>
              }
            </>
          }
      </Card>
    </div>
  )
}

export default UniversityDetail