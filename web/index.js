import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App  from './routes/routes'

const app = document.getElementById('app')
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    app,
);
