import * as React from "react";

import axios from "axios";


function fetchWeather(latitude,longitude){
    var link = `https://www.7timer.info/bin/civil.php?lon=${longitude}&lat=${latitude}&ac=0&unit=metric&output=json&tzshift=0`;
    return new Promise((resolve,reject)=>{
        axios.get(link).then((response)=>{
            resolve(response.data);
        }).then((error)=>{
            reject(error);
        });
    })
}

function geoFindMe() {
    return new Promise((resolve,reject)=>{
        if(navigator.geolocation) {
            function success(position) {
                fetchWeather(position.coords.latitude,position.coords.longitude).then((data)=>{
                    resolve({
                        type: data.dataseries[0].prec_type,
                        weather: data.dataseries[0].weather,
                    })
                }).catch((error)=>{
                    console.error(error);
                    reject("Can't fetch the Weather");
                });
            }
            function error() {
                reject("There is an error with GPS");
            }
            navigator.geolocation.getCurrentPosition(success,error);
        }else{
            reject("Can't use GPS");
        }
    })
}

function showWeather(weatherData){
    if(weatherData){
        var type;
        switch(weatherData.type){
            case 'snow':
            case 'icep':
                type = <div><strong className="text-condor">It's snowing.</strong> Go build a snowman</div>
                break;
            case 'rain':
                type = <div><strong className="text-condor">It's raining.</strong> It's a good time for a hot chocolate drink and rest</div>
                break;
            case 'frzr':
                type = <div><strong className="text-condor">It's freeze raining.</strong> Quick, go get a blanket!</div>
                break;
            default:
                type = <div>What a nice day to study</div>
                break;
        }
        return(
            <div>
                <h5>{type}</h5>
                <h6>Wheater Type: {weatherData.weather}</h6>
            </div>

        )
    }else{
        return null;
    }
}

export default function Weather(props){

    const [weatherData, weatherDataUpdate] = React.useState(false);

    if(!weatherData){
        geoFindMe().then((data)=>{
            weatherDataUpdate(data);
        }).catch((error)=>{
            console.error(error);
            weatherDataUpdate(false);
        });
    }

    return (
        showWeather(weatherData)
    );
}