import SearchBar from "../components/search/SearchBar";
import {useContext, useState} from "react";
import UniversityList from "../components/universities/UniversityList";
import UserContext from "../store/user-context";
import {postUniversity} from "../services/UniversityService";

export default function Search() {
    const [universities, setUniversities] = useState([])
    const [showResults, setShowResults] = useState(false)

    const userCtx = useContext(UserContext)
    const onStarClick = async function (starred, university) {
        if (starred) {
            await postUniversity(userCtx.id, university)
        }
    }

    return (
        <>
            <SearchBar setShowResults={setShowResults} setUniversities={setUniversities} />
            {showResults &&
                <UniversityList universities={universities} onStarClick={onStarClick} />
            }
        </>
    )
}