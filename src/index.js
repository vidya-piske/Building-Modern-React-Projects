import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from './store';

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
