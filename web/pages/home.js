import * as React from "react";
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';

import Clock from "src/components/utils/clock";
import Weather from "src/components/utils/weather";


export default function Home(){
    var userName = ReactSession.get("user.name");
    return (
        <div className="p-5">
            <h1 className="text-condor">{userName ? `Hello ${userName},`:`Hello,`} Welcome to the Condor Universities Database</h1>
            {
                !userName ? <h4> Please <Link to="/login"> log in </Link> to fully use our services </h4>:null
            }
            <div className="my-5">
                <Clock/>
                <Weather/>
            </div>
        </div>
    );
}

