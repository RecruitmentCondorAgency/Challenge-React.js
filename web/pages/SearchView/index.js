import { Container, Row, Col } from "react-bootstrap"
import { NavBar } from "../../components/NavBar"
import axios from "axios"
import { useEffect, useState } from "react"
import './styles.css'
import { University } from "../../components/University"

export const SearchView = () => {

    const [unis, setUnis] = useState([]);
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [unisBlocks, setUnisBlocks] = useState([]);
    const [user, setUser] = useState({});
    const [results, setResults] = useState(0);

    useEffect (() => {
        const loadUniversitys = async() => {
            const response = await axios.get('http://universities.hipolabs.com/search?name=');
            setUnis(response.data)
        }

        const loadUser = async() => {
            const response = await axios.get('http://localhost:3000/users/?email=' + localStorage.getItem('userLogged'));
            setUser(response.data);
        }

        loadUniversitys();
        loadUser();
    },[])

    const onChangeHandler = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = unis.filter(uni=>{
                const regex = new RegExp(`${text}`, "gi")
                return uni.name.match(regex)
            })
        }
        setResults(matches.length);
        setSuggestions(matches);
        if (matches.length <= 20 ) {
            setUnisBlocks(matches);
        } else {
            setUnisBlocks([]);
        }
        setText(text);
    }

    const onSuggestHandler = (text) => {
        alert('aqui')
        setText(text)
        /*setSuggestions([])*/
    }

    

    return (
        <div>
        <NavBar />
        <div className="blockContent">
            <Container >
                <Row>
                    <Col xs={12} md={{ span: 6, offset: 3 }}>
                        <input 
                            className="searchBox"
                            type="text" 
                            onChange={e => onChangeHandler(e.target.value)} 
                            value={text} 
                            placeholder="Search universities by name"
                            onBlur={() =>{setSuggestions([])}} />
                            {suggestions && suggestions.map((suggestion, index) => 
                                <div key={index} className="suggestion" onClick={() => onSuggestHandler(suggestion.name)} >{suggestion.name} </div>
                            )} 

                            <div>
                                <label>Your search returned {results} results.</label>
                                <br/>
                                <label>{results > 20 ? "Enter more text to show college options." : ""}</label>
                            </div>

                            <div className="universities">
                                {unisBlocks.map((item, index) =>
                                    <University key={index} university={item} user={user} showButton={false}/>
                                )}
                            </div>                                                       
                    </Col>
                </Row>
            </Container>
        </div>
        </div>
    )
}