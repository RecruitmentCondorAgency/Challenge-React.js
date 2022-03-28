import * as React from "react";
import { Card } from 'react-bootstrap';

import axios from "axios";

function fetchCountryData(alpha){
    var link = `https://restcountries.com/v3.1/alpha/${alpha}`;
    return new Promise((resolve,reject)=>{
        axios.get(link).then((response)=>{
            resolve(response.data);
        }).then((error)=>{
            reject(error);
        });
    })
}

function getCountryData(countryData){
    function getCapital(capitals){
        return capitals.map((cap) => <a key={cap} className="mx-3" target="_blank" href={`http://www.google.com/search?q=${cap}`}>{cap}</a>)
    }
    function getCurrency(currencies){
        var currency = [];
        Object.keys(currencies).forEach((element)=>{
            currency.push(<span key={element} className="mx-3">{currencies[element].name} ({currencies[element].symbol})</span>)
        });
        return currency;
    }
    function getLanguage(languages){
        var language = [];
        Object.keys(languages).forEach((element)=>{
            language.push(<span key={element} className="mx-3">{languages[element]}</span>)
        });
        return language;
    }
    if(countryData){
        return (
            <div>
                <Card.Text className="text-muted">
                    Location:
                    <a className="mx-3" target="_blank"
                        href={`http://www.google.com/search?q=${countryData.name}`}
                    >
                        {countryData.name}
                    </a>
                </Card.Text>
                <Card.Text className="text-muted">
                    Country's Capital:
                    {getCapital(countryData.capitals)}
                </Card.Text>
                <Card.Text className="text-muted">
                    Currency:
                    {getCurrency(countryData.currencies)}
                </Card.Text>
                <Card.Text className="text-muted">
                    Language:
                    {getLanguage(countryData.languages)}
                </Card.Text>
                <Card.Text className="text-muted">
                    Population:
                    <span className="mx-3">{countryData.population}</span>
                </Card.Text>
            </div>
            
        )
    }
}

function getGallery(images){
    if(images&&images.length>1){
        var List = images.map((img) => <a key={img.url} href={img.url} target="_blank"><img className="m-2" src={img.url} width="100"/></a>);
        return List
    }
}

function checkFavicon(favicon,link=false) {
    try {
        url = new URL(favicon);
        return (
            <img className="mx-3" width="15" height="15"
                src={favicon}
            />
        );
    } catch (_) {
        if(link){
            try {
                url = new URL(`${link}${favicon}`);
                return (
                    <img className="mx-3" width="15" height="15"
                        src={url}
                    />
                );
            } catch (_) {
                return false;
            }
        }
        return false;  
    }
}
  

export default function SelectedUniversity(props){
    var Favicon = checkFavicon(props.favicon,props.link);
    var Gallery = getGallery(props.gallery);

    const [countryData, countryDataUpdate] = React.useState(false);

    if(!countryData||countryData.alpha!=props.alpha){
        fetchCountryData(props.alpha).then((data)=>{
            countryDataUpdate({
                alpha: props.alpha,
                name: data[0].name.common,
                capitals: data[0].capital,
                currencies: data[0].currencies,
                languages: data[0].languages,
                population: data[0].population
            })
        })
    }

    return (
        <Card className="mt-3 shadow" border="light" 
            style={{ width: '100%', padding:'0px' }}
        >
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    <h5 
                        style={{ width: '100%', padding:'0px' }}
                    >
                        {Favicon}
                        {props.name}
                    </h5> 
                </Card.Title>
                <Card.Text className="text-muted">
                    {props.description}
                </Card.Text>
                <Card.Text className="text-muted">
                    { Gallery }
                </Card.Text>
                <Card.Text className="text-muted">
                    Website:
                    <a className="mx-3" target="_blank"
                        href={props.link}
                    >
                        {props.link}
                    </a>
                </Card.Text>
                {countryData.alpha==props.alpha ? getCountryData(countryData):undefined}
            </Card.Body>
        </Card>
    );
}