import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux';
import configureStore from './Store';

ReactDOM.render(
    <React.StrictMode>
    <Provider store={configureStore()}>
       <App />
    </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
