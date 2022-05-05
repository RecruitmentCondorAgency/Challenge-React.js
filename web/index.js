import ReactDOM from 'react-dom'
import { App } from './app'
import 'bootswatch/dist/pulse/bootstrap.min.css';
import 'bootstrap/js/src/collapse.js'

const app = document.getElementById('app')
ReactDOM.render(<App />, app)
