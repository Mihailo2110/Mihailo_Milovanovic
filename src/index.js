import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';

// import the two exports from the last code snippet.
import {store,persistor} from './configureStore';
// import your necessary custom components.

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);
store.subscribe(() => {
  console.log('[Subscription]', store.getState() );
});
