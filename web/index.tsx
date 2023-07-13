import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import store from '../Store'
const app = document.getElementById('app')
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  app,
)
