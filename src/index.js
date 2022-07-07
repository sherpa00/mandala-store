import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from "./slices/userInfoSlice";
import productListReducer from "./slices/productsListSlice";
import currentProductReducer from './slices/currentProductSlice';
import cartReducer from './slices/cartSlice';
import searchReducer from "./slices/searchSlice";
import { Provider } from 'react-redux';

const userInfoStore = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    productsList: productListReducer,
    currentProduct: currentProductReducer,
    cart: cartReducer,
    search: searchReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Provider store={userInfoStore}>
        <App />
      </Provider>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
