import {deleteUniversity, getUserUniversities} from "../services/UniversityService";
import UserContext from "../store/user-context";
import {useContext, useEffect, useState} from "react";
import UniversityList from "../components/universities/UniversityList";

export default function Profile() {
    const userCtx = useContext(UserContext)
    const [universities, setUniversities] = useState([])

    useEffect(async () => {
        let _universities = await getUserUniversities(userCtx.id)
        setUniversities(_universities)
    }, [])

    const onStarClick = async function (starred, university) {
        if (!starred) {
            await deleteUniversity(university.id)
            setUniversities(
                universities.filter(_university => _university.id !==  university.id)
            )
        }
    }

    return (
        <UniversityList universities={universities} onStarClick={onStarClick} allStarred={true} />
    )
}