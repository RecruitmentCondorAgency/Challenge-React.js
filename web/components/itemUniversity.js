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
        }).then((error)=>{
            reject(error);
        });
    })
}

function fetchUniversityData(url){
    var link = `http://localhost:3001/proxy?link=${url}`;
    return new Promise((resolve,reject)=>{
        axios.get(link,{timeout: 10000}).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            reject(error);
        });
    })
}

function fetchFavorites(email,link){
    var link = `http://localhost:3000/favorites?userID=${email}&linkID=${link}`;
    return new Promise((resolve,reject)=>{
        axios.get(link).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            console.error(error);
            reject(error.response);
        });
    });
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

export default function ItemUniversity(props){

    const [session,sessionUpdate] = React.useState(false);
    const [favorites, favoritesUpdate] = React.useState([]);
    const [countryData, countryDataUpdate] = React.useState('Loading...');
    const [descriptionData, descriptionDataUpdate] = React.useState('Loading...');
    
    React.useEffect(() => {
		var userID = ReactSession.get("user.id");
        sessionUpdate(userID);
        if(userID){
            fetchFavorites(userID,props.link).then((data)=>{
                if(data.length>0){
                    favoritesUpdate(data[0]);
                }
            }).catch((error)=>{
                console.log(error);
            });
        }
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
            });
        }
	},[]);

    const toggleFavorite = () => {
        if(favorites.linkID==props.link){
            removeFavorite(favorites.id).then((data)=>{
                favoritesUpdate([]);
            }).catch((error)=>{
                console.log(error);
            });
        }else{
            setFavorite({
                linkID:props.link,
                name:props.name,
                alpha: props.alpha,
                description:descriptionData,
                userID:session
            }).then((data)=>{
                favoritesUpdate(data);
            }).catch((error)=>{
                console.log(error);
            });
        }
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
                    <span className="mx-3 text-center text-muted" 
                        style={{ padding:'0px', fontSize:"12px" }}
                    >
                        {countryData}
                    </span> 
                    <div className="text-end" 
                        style={{ minWidth: '25%', padding:'0px' }}
                    >
                        {session&&descriptionData!='Loading...' ? 
                            <Button className="p-0" variant="none"
                                onClick={toggleFavorite}
                            >
                                <FontAwesomeIcon color={favorites.linkID==props.link ? 'orange':'grey'}
                                    icon={faStar} 
                                />
                            </Button>:null
                        }
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