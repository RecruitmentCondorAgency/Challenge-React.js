import { useState, FormEvent, useEffect } from 'react';;
import { Icon } from '@iconify/react';
import axios from 'axios';
import { connect } from 'react-redux';

const Search = ({ isAuthenticated }) => {
    const [universities, setUniversities] = useState([]);
    const [name, setName] = useState('u');
    const [search, setSearch] = useState('');
    const [searchUniversities, setSearchUniversities] = useState([]);
    const [weatherData, setWeatherData] = useState([]);

    const fetchSearch = async () => {
        try {
            if (search.length > 0) {
                const response = await axios.get('http://universities.hipolabs.com/search?name=' + search + '&limit=5');
                const universities = response.data;
                setSearchUniversities(universities);
            } else {
                setSearchUniversities([]);
            }
        } catch (error) {
            console.error('Error fetching universities:', error);
        }
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
        fetchSearch();
    }

    useEffect(() => {
        const fetchWeatherData = async (cityIds) => {
            try {
                if (cityIds.length > 0) {
                    const weatherResponse = await axios.get(
                        `https://api.openweathermap.org/data/2.5/group?id=${cityIds.join(',')}&units=metric&appid=9d7b48b39758c7221503efc21db7aaf6`
                    );
                    const weatherData = weatherResponse.data.list;
                    setWeatherData(weatherData);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        const fetchUniversities = async () => {
            axios
                .get('http://universities.hipolabs.com/search?name=' + name + '&limit=5')
                .then(async (response) => {
                    const universities = response.data;
                    setUniversities(universities);
                    const cityList = universities.map((university) => university.country);
                    const cityIdsList = [];
                    for (const city of cityList) {
                        const response = await axios.get(
                            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d7b48b39758c7221503efc21db7aaf6`
                        );
                        const cityId = response.data.id;
                        cityIdsList.push(cityId);
                    }
                    await fetchWeatherData(cityIdsList);
                })
                .catch((error) => {
                    console.error('Error fetching universities:', error);
                });
        };
        fetchUniversities();

    }, []);

    return (
        <>
            <section>
                <div className="container d-flex flex-wrap justify-content-center">
                    <div className="col-md-6">
                        <form className="row">
                            <div className="col-md-10">
                                <input type="text" className="form-control form-control-lg"
                                    placeholder="Search" onChange={handleChange} />
                                <div className="search card">
                                    {searchUniversities && searchUniversities.map((search, index) => (
                                        <div className="container " key={index}>
                                            <div className="col-md-12">   <strong> {search.name} </strong>   </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-md-2">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    <Icon icon="material-symbols:search" />
                                </button>
                            </div>
                        </form>

                        <div className="universities">
                            <h4><strong>Universities</strong></h4>

                            {universities && universities.map((university, index) => (
                                <div key={index} className="d-flex flex-wrap  py-3 mb-4 border-bottom bg-white text-dark  shadow-lg">
                                    <div className="container" >
                                        <div className="row">
                                            <div className="col-md-9">   <strong> {university.name} </strong> &nbsp; <span> {university.country} </span></div>
                                            <div className="col-md-3">
                                                <span className="float-end">
                                                    <Icon icon="mdi:star" color="orange" />
                                                    <Icon icon="icon-park-outline:share" />
                                                </span>
                                            </div>
                                        </div>

                                        {weatherData[index] && weatherData[index] ? (
                                            <div>
                                                <h5>Weather: {weatherData[index].weather[0].description}
                                                    <img src={`http://openweathermap.org/img/wn/${weatherData[index].weather[0].icon}.png`} alt="Weather Icon" />
                                                </h5>
                                                <p>Temperature: {weatherData[index].main.temp}°C</p>
                                            </div>
                                        ) : (
                                            <p>Loading weather data for {university.country}...</p>
                                        )}
                                    </div>
                                </div>
                            ))}
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

export default connect(mapStateToProps)(Search);