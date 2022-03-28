import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';

export default function signup() {
    const navigate = useNavigate();
    
    ReactSession.set("user.id",false);
    ReactSession.set("user.name",false);

    React.useEffect(() => {
        navigate('/');
	},[]);

    return (
        <div>Loading...</div>
    );
}