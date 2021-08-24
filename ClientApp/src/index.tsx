import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './App/styles.scss';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import {store, StoreContext} from './stores/store';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById('root'),
)
;

reportWebVitals();
