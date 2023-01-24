import axios from 'axios';
import { useState, useEffect } from 'react';
import { CountryInfo } from './CountryInfo';

import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

import './styles.css'

export const UniversityDetails = (props) => {

    const [code, setCode] = useState(props.university.alpha_two_code)
    const [country, setCountry] = useState({})
    //const [changeUniversity, forceUpdate] = 
    

    const loadCountry = async() => {
        const response = await axios.get("https://restcountries.com/v3.1/alpha/" + props.university.alpha_two_code);
        if (Object.keys(response).length === 0) {
            toast.error('No country selected');
        } else {
            setCountry(response.data[0])
        }
    }


    useEffect(()=>{

        console.log(props.university);
        setCode (props.university.alpha_two_code);
        loadCountry();
        console.log(country)
    },[]);

    loadCountry();

    return (
        <div className="universityDetails">
            <label><b>{props.university.name}</b></label>

            <label><span>Location: </span> <a href='#' target="_blank">{props.university.country}</a></label>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                // reset the state of your app so the error doesn't happen again
                }}>
                <CountryInfo country={country} />
            </ErrorBoundary>         
        </div>
    )
}
