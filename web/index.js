import ReactDOM from 'react-dom'

import './styles.css'

import {
    RouterProvider,
  } from "react-router-dom";

import router from './src/routes/router'





const app = document.getElementById('app')
ReactDOM.render( <RouterProvider router={router} />, app)
