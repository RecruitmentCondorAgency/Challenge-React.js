import { useEffect, useState } from "react"
import { Container, Row, Col, FormLabel } from "react-bootstrap"
import { NavBar } from "../../components/NavBar"
import { University } from "../../components/University";
import { toast } from "react-toastify";
import axios from "axios";
import { UniversityDetails } from "../../components/UniversityDetails";


export const ProfileView = () => {

    const [userLogged, setUserLogged] = useState(localStorage.getItem('userLogged'));
    const [user, setUser] = useState({})
    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState({});

    useEffect(()=>{

        const loadUser = async() => {
            const response = await axios.get('http://localhost:3000/users/?email=' + localStorage.getItem('userLogged'));
            setUser(response.data);
            setUniversities(response.data[0].universities)
        }

        loadUser();

    },[]);

    return (
        <div>
        <NavBar />
        <div className="blockContent">
                <Container>
                    <Row>
                        <Col xs={12} md={6}>
                            <h2>My Favorites</h2>
                            {universities.map((item, index) => (
                                <University key={index} university={item} selectedUniversity={selectedUniversity} setSelectedUniversity={setSelectedUniversity} showButton={true} user={user}></University>
                            ))}
                        </Col>
                        <Col xs={12} md={6}>
                            <h2>Selected University</h2>
                            <>
                                {(selectedUniversity.name == undefined) ? <p>Selecciona una universidad</p> : <UniversityDetails university={selectedUniversity} />}
                            </>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        
    )
}