import { useState, FormEvent, useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { connect } from 'react-redux';


const Profile = ({ isAuthenticated, user }) => {
    if (!isAuthenticated) {
        return null;
    }
    const id = user.id;
    const [countryData, setCountryData] = useState(null);
    const [singleWeatherData, setSingleWeatherData] = useState();
    const [universities, setUniversities] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [weatherData, setWeatherData] = useState([]);


    const getLanguage = (data) => {
        const languageKeys = Object.keys(data.languages);
        const firstLanguageKey = languageKeys[0];
        const firstLanguageValue = data.languages[firstLanguageKey];
        return firstLanguageValue;
    };
    const getCurrencies = (data) => {
        const currencyKeys = Object.keys(data.currencies);
        const firstCurrencyKey = currencyKeys[0];
        const firstCurrencyValue = data.currencies[firstCurrencyKey].name
            + '  (' + data.currencies[firstCurrencyKey].symbol + ')';
        return firstCurrencyValue;
    };

    const handleChange = async (university, index) => {
        setSelected(university);
        const countryName = university.country;
        const countryResponse = await fetchCountryAPI(countryName);
        const country = countryResponse.data[0];
        setCountryData(country);
        setSelectedIndex(index);
        getSingleWeather(weatherData[index]);
    };

    useEffect(() => {
        const fetchUserUniversities = async() => {
            try {
                const userUniversitiesResponse = await fetchUserUniversitiesAPI(id);
                const universities = userUniversitiesResponse.data.universities;

                if (universities.length > 0) {
                    const countryName = universities[0].country;
                    const countryResponse = await fetchCountryAPI(countryName);
                    const country = countryResponse.data[0];
                    setUniversities(universities);
                    setSelected(universities[0]);
                    setCountryData(country);
                    getWeather();
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchWeatherData = async () => {
            try {
                const universitiesResponse = await fetchUserUniversitiesAPI(id);
                const universities = universitiesResponse.data.universities;
                const cities = universities.map((university) => university.country);
                const cityIds = await getCityIds(cities);
                const weatherResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/group?id=${cityIds.join(',')}&units=metric&appid=9d7b48b39758c7221503efc21db7aaf6`
                );
                const weatherData = weatherResponse.data.list;
                setWeatherData(weatherData);
                getSingleWeather(weatherData[selectedIndex]);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
      
        };

        const getCityIds = async (cities) => {
            try {
                const cityIds = [];
                for (const city of cities) {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d7b48b39758c7221503efc21db7aaf6`
                    );
                    const cityId = response.data.id;
                    cityIds.push(cityId);
                }
                return cityIds;
            } catch (error) {
                console.error('Error fetching city ids:', error);
            }
        };
        fetchUserUniversities();
        fetchWeatherData();
    }, [id]);


    const fetchUserUniversitiesAPI = async (id) => {
        const response = await axios.get('http://localhost:3000/users/' + id);
        return response;
    };

    const fetchCountryAPI = async (countryName) => {
        const response = await axios.get('https://restcountries.com/v3.1/name/' + countryName + '?fullText=true');
        return response;
    };

    const getWeather = () => {
        try {
            if(weatherData){
                setSingleWeatherData(weatherData[selectedIndex]);
            }else{
                console.log("weather data is null");
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const getSingleWeather = (data) => {
        try {
         setSingleWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h4><strong>My Favorites</strong></h4>
                            {universities.map((university, index) => (
                                <div key={index} className="d-flex flex-wrap  py-3 mb-4 border-bottom bg-white text-dark  shadow-lg">
                                    <div className="container" onClick={(e) => { handleChange(university, index) }} >
                                        <div className="row">
                                            <div className="col-md-9">   <strong> {university.name} </strong> &nbsp; <span> {university.country} </span></div>
                                            <div className="col-md-3">
                                                <span className="float-end">
                                                    <Icon icon="mdi:star" color="orange" />
                                                    <Icon icon="icon-park-outline:share" />
                                                </span>
                                            </div>
                                        </div>
                                        {weatherData[index] ? (
                                            <div>
                                                <h3>Weather: {weatherData[index].weather[0].description}
                                                    <img src={`http://openweathermap.org/img/wn/${weatherData[index].weather[0].icon}.png`} alt="Weather Icon" />
                                                </h3>
                                                <p>Temperature: {weatherData[index].main.temp}°C</p>
                                            </div>
                                        ) : (
                                            <p>Loading weather data for {university.country}...</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-6">
                            <h4><strong>Selected University</strong></h4>
                            <div className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom bg-white text-dark  shadow-lg">
                                <div className="card-body">
                                    {selected &&
                                        <>
                                            <h6 className='card-title'>{selected.name}</h6>
                                            {singleWeatherData && 
                                            <div>
                                                <h2>Weather: {singleWeatherData.weather[0].description}</h2>
                                                    <p>Temperature: { singleWeatherData.main.temp}°C</p>
                                                    <img src={`http://openweathermap.org/img/wn/${singleWeatherData.weather[0].icon}.png`} alt="Weather Icon" />
                                            </div>
                                           }
                                            <p className="card-text"> Website: <span className='info'>{selected.domains}</span> </p>
                                        </>
                                    }
                                    {countryData &&
                                        <>
                                            <p className="card-text"> Location:
                                                <span className='info'>
                                                    &nbsp; <img src={countryData.flags.png} height="10px"></img>
                                                    &nbsp; {countryData.name.common},
                                                    &nbsp; {countryData.continents}
                                                </span>
                                            </p>
                                            <p className="card-text"> Country's capital:
                                                <span className='info'> {countryData.capital} </span>
                                            </p>
                                            <p className="card-text"> Currency: {getCurrencies(countryData)}  </p>
                                            <p className="card-text"> Language: {getLanguage(countryData)} </p>
                                            <p className="card-text"> Population:
                                                &nbsp; {countryData.population}
                                            </p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
    };
};

export default connect(mapStateToProps)(Profile);