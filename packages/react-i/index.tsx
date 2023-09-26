import { render } from 'react-dom'
import  App  from './src/app'
import ThemeProvider from './src/component/ThemeProvider'

const app = document.getElementById('app')
render(
    <ThemeProvider>

     <App />
    </ThemeProvider>
, app)
