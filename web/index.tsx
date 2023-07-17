import { render } from 'react-dom'
import { App } from './App'
import * as fs from 'fs'


var data = fs.readFileSync('./template.html','utf8');
document.getElementById('demo').innerHTML = data;



const app = document.getElementById('app')
render(<App />, app)
