import * as React from "react";
import { ReactSession } from 'react-client-session';

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

function removeFavorite(id){
    var link = `http://localhost:3000/favorites/${id}`;
    return new Promise((resolve,reject)=>{
        axios.delete(link).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            console.error(error);
            reject(error.response);
        });
    });
}

function setFavorite(data){
    var link = `http://localhost:3000/favorites`;
    return new Promise((resolve,reject)=>{
        axios.post(link,data).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            console.error(error);
            reject(error.response);
        });
    });
}

export default function FavoriteUniversity(props){

    const [session,sessionUpdate] = React.useState(false);
    const [countryData, countryDataUpdate] = React.useState(false);
    const [favorite, favoriteUpdate] = React.useState(true);

    if(!countryData){
        fetchCountryData(props.alpha).then((data)=>{
            countryDataUpdate(data[0].name.common)
        });
    }

    React.useEffect(() => {
		var userID = ReactSession.get("user.id");
        sessionUpdate(userID);
	},[]);

    const toggleFavorite = () => {
        if(favorite){
            removeFavorite(props.id).then((data)=>{
                favoriteUpdate(false);
            }).catch((error)=>{
                console.log(error);
            });
        }else{
            setFavorite({
                linkID:props.link,
                name:props.name,
                alpha: props.alpha,
                description:props.description,
                userID:session
            }).then((data)=>{
                favoriteUpdate(true);
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    return (
        <Card className="mb-3 shadow cursor-pointer" border="light" 
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
                    <h6 className="mx-3 text-center text-muted" 
                        style={{ padding:'0px', fontSize:"12px" }}
                    >
                        {countryData}
                    </h6> 
                    <div className="text-end" 
                        style={{ minWidth: '25%', padding:'0px' }}
                    >
                        <Button className="p-0" variant="none"
                            onClick={toggleFavorite}
                        >
                            <FontAwesomeIcon color={favorite ? 'orange':'grey'}
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