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
        }).then((error)=>{
            reject(error);
        });
    })
}

function fetchUniversityData(url){
    var link = `http://localhost:3001/proxy?link=${url}`;
    return new Promise((resolve,reject)=>{
        axios.get(link).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            reject(error);
        });
    })
}

export default function ItemUniversity(props){

    const [countryData, countryDataUpdate] = React.useState('Loading...');
    const [descriptionData, descriptionDataUpdate] = React.useState('Loading...');

    if(countryData=='Loading...'){
        fetchCountryData(props.alpha).then((data)=>{
            countryDataUpdate(data[0].name.common);
        });
    }

    if(descriptionData=='Loading...'){
        fetchUniversityData(props.link).then((data)=>{
            if(data.ogDescription){
                descriptionDataUpdate(data.ogDescription);
            }else{
                descriptionDataUpdate("Sorry. We couldn't find any description");
            }
        }).catch(()=>{
            descriptionDataUpdate("Sorry. We were unable to obtain the information from the University");
        })
    }

    return (
        <Card className="mt-3 shadow" border="light" 
            style={{ width: '100%', padding:'0px' }}
        >
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    <h6 
                        style={{ width: '50%', padding:'0px' }}
                    >
                        {props.name}
                    </h6> 
                    <span className="mx-3 text-muted" 
                        style={{ padding:'0px', fontSize:"12px" }}
                    >
                        {countryData}
                    </span> 
                    <div className="text-end" 
                        style={{ minWidth: '25%', padding:'0px' }}
                    >
                        <Button className="p-0" variant="none">
                            <FontAwesomeIcon color="grey"  
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
                    <span 
                        title={descriptionData}
                    >     
                        {descriptionData&&descriptionData.length>90 ? descriptionData.substring(0,descriptionData.substring(0,90).lastIndexOf(' '))+' ...':descriptionData }   
                    </span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}