import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App  from './routes/routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/assets/css/styles.css'

const app = document.getElementById('app')
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    app,
);
