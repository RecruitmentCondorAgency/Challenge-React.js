import * as React from "react";

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

function showSelectedUniversity(selectedUniversity){
    if(selectedUniversity){
        return (
            <div className="col-12 col-lg-6 px-sm-5 my-5 mt-lg-0">
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

    const [selectedUniversity, selectedUniversityUpdate] = React.useState(false);

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
        })
    };

    return (
        <div className="page container">
            <div className="row">
                <div className="col-12 col-lg-6 px-sm-5 mx-auto">
                    <h2 className="text-condor">My Favorites</h2>
                    <FavoriteUniversity
                        model={selectUniversity}
                        code="1"
                        name="University of Oxford" 
                        alpha="GB" 
                        description="University Description"
                        link="http://www.ox.ac.uk/"
                    />
                    <FavoriteUniversity
                        model={selectUniversity}
                        code="2"
                        name="Massachusetts Institute of Technology" 
                        alpha="US" 
                        description="MIT Description"
                        link="http://web.mit.edu/"
                    />
                </div>
                {showSelectedUniversity(selectedUniversity)}
            </div>
        </div>
    );
}

