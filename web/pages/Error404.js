import * as React from "react";

export default function Error404() {
    const image = require('src/assets/img/logo.png');
    return (
        <div className="full-center text-center">
            <div className="my-5">
                <img src={image} width="100" height="100" className="d-inline-block align-top" alt="React Bootstrap logo"/>
            </div>
            <h1>Error 404: Not Found</h1>
        </div>
    );
}