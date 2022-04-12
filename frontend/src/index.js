import React from 'react';
import ReactDOM from 'react-dom';
import './SCSS/index.scss';
import App from './App';
import Spiner from './components/spinner/spinner';
import reportWebVitals from './reportWebVitals';
import StoreProvider from './store/storeProvider';

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <Spiner />
            <App />
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
