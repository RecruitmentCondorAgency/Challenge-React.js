import * as React from "react";
import { Card,Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

function fetchCountryData(alpha){
    var link = `https://restcountries.com/v3.1/alpha/${alpha}`;
    return new Promise((resolve,reject)=>{
        axios.get(link).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            reject(error);
        });
    })
}

export default function FavoriteUniversity(props){

    const [countryData, countryDataUpdate] = React.useState(false);

    if(!countryData){
        fetchCountryData(props.alpha).then((data)=>{
            countryDataUpdate(data[0].name.common)
        });
    }

    return (
        <Card className="mt-3 shadow cursor-pointer" border="light" 
            style={{ width: '100%', padding:'0px' }}
            onClick={
                ()=>{ 
                    props.model({
                        name:props.name,
                        link:props.link,
                        alpha:props.alpha
                    });
                }
            }
        >
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    <h6 
                        style={{ width: '50%', padding:'0px' }}
                    >
                        {props.name}
                    </h6> 
                    <h6 className="mx-3 text-muted" 
                        style={{ padding:'0px', fontSize:"12px" }}
                    >
                        {countryData}
                    </h6> 
                    <div className="text-end" 
                        style={{ minWidth: '25%', padding:'0px' }}
                    >
                        <Button className="p-0" variant="none">
                            <FontAwesomeIcon color="orange"  
                                icon={faStar} 
                            />
                        </Button>
                        <Button className="mx-3 p-0" variant="link"
                            href={props.link} target="_blank"
                        >
                            <FontAwesomeIcon color="grey"  
                                icon={faArrowUpRightFromSquare} 
                            />
                        </Button>
                    </div>
                </Card.Title>
                <Card.Text className="text-muted">
                    {props.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}