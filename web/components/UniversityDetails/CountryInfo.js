import axios from 'axios'
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import './styles.css'

export const CountryInfo = (props) => {

    const [country, setCountry] = useState({})

    let pais = {}

    useEffect(()=>{

    },[]);

    const languages = (obj) => {
        const arr = JSON.parse(obj.stringData);

        let languages  = 'The official language is ' + arr[0];
        let seconds = "";

        if (arr.length > 1 ) {
            languages = languages + ', pero tambien se habla '
            for (var i = 1; i < arr.length; i++) {
                seconds = seconds + arr[i] + ", ";
            }
            seconds[seconds.length - 1] = '';
        }

        languages = languages + seconds;

        return languages
    }

    /* */

    return (
        <div>
            
            <p>
                <img src={props.country.flags.png} className="flagDescription"/>
                {props.country.name.common} is a country located in {props.country.region}, specifically in  {props.country.subregion}. It has an area of {props.country.area}km2 and a population of approximately {props.country.population} people. 
            </p>
            <p>
                Its capital is {props.country.capital}. 
            </p>
            <h4>Weather forecast</h4>
            <img className="img-fluid" src={"https://www.7timer.info/bin/civil.php?lon="+props.country.latlng[1]+"&lat="+props.country.latlng[0]+"&ac=0&lang=en&unit=metric&output=internal&tzshift=0"} />
             
              
        </div>
    )
}