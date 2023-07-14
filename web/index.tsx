import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import store from '../Store'
const app = document.getElementById('app')
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </PersistGate>,
  app,
)
