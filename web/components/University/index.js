import { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css'
import { Button } from 'react-bootstrap'
import star from '../../assets/img/star.png'
import staroff from '../../assets/img/star-off.png'
import open from '../../assets/img/open.png'
import { toast } from "react-toastify";

export const University = (props) => {

    //const [university, setUniversity] = useState({})

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(()=>{
        const initFavorite = () => {
            let fav = false
            for (let index = 0; index < props.user[0].universities.length; index++) {
                 (props.university.name === props.user[0].universities[index].name ? fav = true : fav = fav)
            }
            setIsFavorite(fav)
        };

        initFavorite();
    },[]);

    const updateUniversity = () => {
        props.setSelectedUniversity(props.university)
    }

    const updateUser = () => {
       let newUni = {
            "name": props.university.name,
            "country": props.university.country,
            "alpha_two_code": props.university.alpha_two_code,
            "web_pages": props.university.web_pages
        }
        let message = '';
        if(isFavorite) {
            //to do

            props.user[0].universities.forEach(function(currentValue, index, arr){
                if(props.user[0].universities[index].name == props.university.name){
                    props.user[0].universities.splice(index, 1);     
                }
            })
            message='College removed from favorites'

            //en todo
        } else {
            props.user[0].universities.push(newUni)
            message='College added to favorites'
        }
        axios.put('http://localhost:3000/users/' + props.user[0].id , props.user[0])
        .then((resp) => {
            toast.success('Success: ' + message);                
        }).catch((err) => {
            toast.error('Update failed :' + err.message);
        });
        setIsFavorite(!isFavorite)

    }
 
    return(
        <div className="university">
            <div className="infoBlock"><label><b>{props.university.name}</b></label>
                <span>
                <img className="flag" src={"https://flagcdn.com/h20/"+ props.university.alpha_two_code.toLowerCase() + ".png"}
                        height="20"  alt={props.university.alpha_two_code.toLowerCase()}></img>
                <label>{props.university.country}</label>
                </span>
                <a href={props.university.web_pages[0]}>{props.university.web_pages[0]}</a>
            </div>
            <div className="actionBlock">
                {props.showButton ? <Button onClick={updateUniversity}><img src={open} /></Button> : ""}
                <span className='favoriteIcon' onClick={updateUser}> <img src={isFavorite ? star : staroff} /></span>
            </div>
           
           
        </div>
    )
}