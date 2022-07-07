
import { useEffect, useState } from "react";
import { getDoc,doc, } from "firebase/firestore";
import db from "./store-components/firebase-firestore";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, removeUserInfo } from "../slices/userInfoSlice";
import FrontHeading from "./store-components/front-heading";
import NavBar from "./store-components/navbar";
import banner from "../images/big-sale1.jpg"
import OurStrength from "./store-components/outStrength";
import Trending from "./store-components/trending";
import NewArrivals from "./store-components/newArrivals";
import ForYou from "./store-components/forYou";
import Footer from "./store-components/footer";
import { Route,Routes } from "react-router-dom";
import ProductPage from "./store-components/productPage";
import CartPage from "./store-components/cartPage";
import promo from "../images/promo.jpg";
import SearchPage from "./store-components/searchPage";
import CategoryPage from "./store-components/catergories";
import ShippingPage from "./store-components/shippingPage";
import {addCart} from "../slices/cartSlice"
import Settings from "./store-components/settings";



const user = sessionStorage.getItem("uid");

function Store() {
    
    // global store userInfo state
    const userInfo = useSelector(state => state.userInfo.userInfo);
    const cartItems = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    useEffect(() => {

        if (user === null) {
            return ;
        }


        getDoc(doc(db,"users",user)).then((data) => {
            let items = data.data().cart;
            if (items.length !== cartItems.length) {
                for (let i of items) {
                    dispatch(addCart(i));
                }
            }
        }).catch((err) => {
            console.log("error occured")
        })

       dispatch(removeUserInfo());
       dispatch(addUserInfo(window.sessionStorage.getItem("uid")));
       console.log(userInfo);

       window.scrollTo(0,0);
    },[]);

    if (user === null) {
        return <h2>
            Please <a href="/login">Login</a> to continue shopping.
        </h2>
    }

    return ( 
        <div className="store">
            <NavBar/>
            <Routes>
                <Route path="/" element={<>
                    <img src={banner}  alt="banner" id="banner"/>
                    <FrontHeading/>
                    <OurStrength/>
                    <Trending/>
                    <img src={promo} id="promo" alt="promo" />
                    <NewArrivals/>
                    <ForYou/>
                </>}></Route>
                <Route path="/search" element={<SearchPage/>}></Route>
                <Route path="/cart" element={<CartPage/>}></Route>
                <Route path="/product/:id" element={<ProductPage/>}></Route>
                <Route path="/category/:type" element={<CategoryPage/>}></Route>
                <Route path="/cart/payment" element={<ShippingPage/>}></Route>
                <Route path="/settings" element={<Settings/>}></Route>
            </Routes>
            <Footer/>
        </div>
     );
}

export default Store;