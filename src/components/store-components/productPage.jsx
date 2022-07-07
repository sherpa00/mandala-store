import React, {useState,useEffect, createRef} from "react";
import "./productPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Trending from "./trending";
import NewArrivals from "./newArrivals";
import { Link,useNavigate } from "react-router-dom";
import { addCart } from "../../slices/cartSlice";
import { addCurrentProduct } from "../../slices/currentProductSlice";
import { addDoc, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db from "./firebase-firestore";


function ProductPage() {

    const user = sessionStorage.getItem("uid");
    console.log(user);

    const productRef = createRef();

    const [count,setCount] = useState(1);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // global cart state
    const cartItems = useSelector(state => state.cart.cart);

    // current product selecte
    const currentProduct = useSelector(state => state.currentProduct.currentProduct);

    const handleMinus = (e) => {
        if (count > 1) {
            setCount(count-1);
        }
    }

    const handlePlus = (e) => {
        setCount(count+1);
    }

    const handleAddToCart = (e) => {
        if (count > Number(currentProduct.quantity)) {
            toast.error("Insufficient Quantity for this product")
            setCount(1);
            return;
        }

        if (cartItems.length > 0) {
            let isDup = false;
            for (let i of cartItems) {
                if (i.img === currentProduct.img) {
                    isDup = true;
                    break;
                }
            }
            
            if (!isDup) {
                toast.success(`${currentProduct.name} added to cart.`);
                let newCurrentProduct = {...currentProduct,count: count};
                dispatch(addCart(newCurrentProduct));
                //navigate("/store/cart")
            } else {
                toast.error(`${currentProduct.name} already in cart.`)
            }
        } else {
            toast.success(`${currentProduct.name} added to cart.`);
            dispatch(addCart({...currentProduct,count: count}));
            //navigate("/store/cart")
        }
        setCount(1);
    }

    useEffect(() => {
        // scrollintoView when routed to this component.
        productRef.current.scrollIntoView();
    })

    useEffect(() => {
        // set the array cart in users collection
        getDoc(doc(db,"users",user)).then((data) => {
            setDoc(doc(db,"users",user),{
                cart: cartItems
            },{merge: true})
        });
    },[cartItems])
    

   /* useEffect(() => {
        console.log(currentProduct);
        if (Object.keys(currentProduct) <= 0) {
            console.log("Empty");

            const sessionProduct = sessionStorage.getItem("sessionProduct")

            let value = {};

            sessionProduct.split(" ++-++").map((el) => {
                let valKey = el.split("<->")[0]
                let val = el.split("<->")[1]
                value[valKey] = val;
            })

            dispatch(addCurrentProduct(value));

        } else {

            console.log("Not empty");

            // add to session storage
            let str = "";
            for (let i of Object.keys(currentProduct)) {
                if (str !== "") {
                    str += " ++-++";
                }
                let s = `${i}<->${currentProduct[i]}`;
                str += s;

            }

            sessionStorage.setItem("sessionProduct",str)
        } 

    },[])
    */

    if (!currentProduct) {
        return <h1>Error ! Page not found.</h1>
    }

    const getStars = (num) => {
        if (num === "1") {
            return <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </div>
        }
        if (num === "2") {
            return <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </div>
        }
        if (num === "3") {
            return <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </div>
        }
        if (num === "4") {
            return <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-o"></span>
                    </div>
        }
        if (num === "5") {
            return <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </div>
        }
        if (num === "1.5") {
            return <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-half-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </div>
        }
        if (num === "2.5") {
            return <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-half-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </div>
        }
        if (num === "3.5") {
            return <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-half-o"></span>
                        <span className="fa fa-star-o"></span>
                    </div>
        }
        if (num === "4.5") {
            return <div className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-half-o"></span>
                    </div>
        }
    }

    return ( 
        <div className="product-page" ref={productRef}>
            <div className="main-product">
                <img src={currentProduct.img} alt="pic" />
                <div className="product-info">
                    <h2 id="heading">{currentProduct.name}</h2>
                    <p id="category">Category: <b>{currentProduct.type}</b></p>
                    <h4 id="desc">{currentProduct.description}</h4>
                    {
                        getStars(currentProduct.stars)
                    }
                    <p id="price">{currentProduct.price}</p>
                    <p id="qty">Qty: <b>{currentProduct.quantity}</b></p>
                    <div className="counter">
                        <button id="minus" onClick={handleMinus}>-</button>
                        <p id="count">{count}</p>
                        <button id="plus" onClick={handlePlus}>+</button>
                    </div>
                    <button id="add_to_cart" onClick={handleAddToCart}>Add <span className="fa fa-cart-plus"></span></button>
                </div>
            </div>
            <button id="go_back"><Link to="/store" style={{color: "black",textDecoration: "none"}}><span className="fa fa-arrow-left"></span> Go Back</Link></button>
            <div className="other_products">
                <OtherProducts/>        
            </div>
        </div>
     );
}

function OtherProducts() {
    return ( 
        <>
            <Trending/>
            <NewArrivals/>
        </>
     );
}

export default ProductPage;