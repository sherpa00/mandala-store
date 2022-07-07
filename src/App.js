import { Routes,Route } from 'react-router';
import {initializeApp} from "firebase/app";
import './App.css';
//import LandingHomePage from './components/landingHome';
//import LogIn from './components/log-in';
//import SignIn from './components/sign-in';
//import Store from './components/store';
import { ToastContainer } from 'react-toastify';
import React,{ useEffect } from 'react';
import allRef from './components/store-components/firebaseArray';
import { getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProductList } from './slices/productsListSlice';
import Loading from './components/store-components/loader';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYI1YfEuyG0S4QDJKl5wpaIYYoAKB2Sck",
  authDomain: "mandala-store-bf8bc.firebaseapp.com",
  projectId: "mandala-store-bf8bc",
  storageBucket: "mandala-store-bf8bc.appspot.com",
  messagingSenderId: "490495953314",
  appId: "1:490495953314:web:c8fbbff74f609991fdcafb"
};

// react lazy loading and suspense for seamless routing to pages
const LandingHomePage = React.lazy(() => import("./components/landingHome"));

const Store = React.lazy(() => import("./components/store"))

const LogIn = React.lazy(() => import("./components/log-in"));

const SignIn = React.lazy(() => import("./components/sign-in"))

//global auth
export const auth = getAuth();

function App() {

  const app = initializeApp(firebaseConfig);

  //dispatch func
  const dispatch = useDispatch();

  //get the products from firebase and add it to global state productList
  useEffect(() => {
    //loop throught all the ref storage and get download ref and add to temp array
    for (let i of allRef) {
      // temp obj for storing temp prouct
      let temp = {};
      // get img url and json url
      getDownloadURL(i.imgRef).then((url) => {
        temp.img = url;
      });
      getDownloadURL(i.jsonRef).then((data) => {
        axios.get(data).then((res) => {
          let result = res.data;
          temp.name = result.name;
          temp.price = result.price;
          temp.description = result.description;
          temp.type = result.type;
          temp.stars = result.stars;
          temp.quantity = result.quantity;
          dispatch(addProductList(temp));
        })
      })
    };
  },[]);

  return (
    <div className="App">
      <React.Suspense fallback={<Loading/>}>
        <Routes>
          <Route path='/' element={<LandingHomePage/>}></Route>
          <Route path='/login' element={<LogIn app={app}/>}></Route>
          <Route path="/signup" element={<SignIn app={app}/>}></Route>
          <Route path="/store/*" element={<Store/>}></Route>
        </Routes>
        <ToastContainer closeButton={false} position="top-center"/>
      </React.Suspense>
    </div>
  );
}

export default App;
