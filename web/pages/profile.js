import * as React from "react";
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';

import FavoriteUniversity from "src/components/favoriteUniversity";
import SelectedUniversity from "src/components/selectedUniversity";

import axios from "axios";

function fetchUniversitySelectedData(url){
    var link = `http://localhost:3001/proxy?link=${url}`;
    return new Promise((resolve,reject)=>{
        axios.get(link).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            reject(error);
        });
    })
}

function fetchFavorites(email){
    var link = `http://localhost:3000/favorites?userID=${email}`;
    return new Promise((resolve,reject)=>{
        axios.get(link).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            console.error(error);
            reject(error.response);
        });
    });
}

function showSelectedUniversity(selectedUniversity){
    if(selectedUniversity){
        return (
            <div className="col-12 col-lg-6 px-2 my-5 mt-lg-0">
                <h2 className="text-condor">Selected University</h2>
                <SelectedUniversity
                    name={selectedUniversity.name}
                    favicon={selectedUniversity.favicon}
                    link={selectedUniversity.link}
                    alpha={selectedUniversity.alpha}
                    description={selectedUniversity.description}
                    gallery={selectedUniversity.gallery}
                />
            </div>
        )
    }
}

export default function Profile(){

    const [session,sessionUpdate] = React.useState(false);
    const [selectedUniversity, selectedUniversityUpdate] = React.useState(false);
    const [favorites, favoritesUpdate] = React.useState([]);

    function showFavorites(favorites){

        const selectUniversity = (e) => {
            fetchUniversitySelectedData(e.link).then((data)=>{
                selectedUniversityUpdate({
                    name:e.name,
                    favicon: data.favicon,
                    link:e.link,
                    alpha: e.alpha,
                    description: data.ogDescription,
                    gallery: data.ogImage
                })
            }).catch((error)=>{
                alert("Can't fetch University Webpage Data");
                console.error(error);
            });
        };
    
        if(favorites.length>0){
            var key = 0
            var list = [];
            favorites.forEach(element => {
                list.push(
                    <FavoriteUniversity
                        model={selectUniversity}
                        key={key++}
                        id={element.id}
                        name={element.name}
                        alpha={element.alpha}
                        description={element.description}
                        link={element.linkID}
                    />
                );
            });
            return list;
        }else{
            return (
                <div>It seems that you do not have any favorite university. We recommend you to choose some <Link to="/search"> Here </Link> </div>
            )
        }
    }

    React.useEffect(() => {
		var userID = ReactSession.get("user.id");
        sessionUpdate(userID);
        if(userID){
            fetchFavorites(userID).then((data)=>{
                if(data.length>0){
                    favoritesUpdate(data);
                }
            }).catch((error)=>{
                console.log(error);
            });
        }
	},[]);


    return (
        <div className="page container">
            <div className="row flex-column-reverse flex-lg-row">
                <div className="col-12 col-lg-6 px-2 mx-auto mt-5 mt-lg-0">
                    <h2 className="text-condor">My Favorites</h2>
                    {showFavorites(favorites)}
                </div>
                {showSelectedUniversity(selectedUniversity)}
            </div>
        </div>
    );
}

