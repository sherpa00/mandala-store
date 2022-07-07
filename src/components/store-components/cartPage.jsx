import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeAll, removeCart } from "../../slices/cartSlice";
import "./cartPage.css";
import { useEffect, useState } from "react";
import ShippingPage from "./shippingPage";
import { setDoc,doc, getDoc } from "firebase/firestore";
import db from "./firebase-firestore";

const user = sessionStorage.getItem("uid");

function CartPage() {

    return (
        <>
            <div className="cart-page">
                <ShopingCart/>
                <Summary/>
            </div>
        </>
     );
}

function ShopingCart() {

    const cartItems = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    const handleDeleteAll = (e) => {
        dispatch(removeAll());
        toast.success("All Items Removed.")
    }

    useEffect(() => {
        // set the array cart in users collection
        getDoc(doc(db,"users",user)).then((data) => {
            setDoc(doc(db,"users",user),{
                username: data.data().username,
                email: data.data().email,
                uid: data.data().uid,
                cart: cartItems
            },{merge: true})
        });
    },[cartItems])
    
    return (
        <div className="shoping-cart">
            <h2>Shoping Cart items: ({cartItems.length})</h2>
            <div className="cart-products">
                {
                    cartItems.length <= 0 ? <h3>EMPTY CART</h3> : cartItems.map((el,index) => {
                        return <CartProduct
                                    key={index}
                                    id={index}
                                    img={el.img}
                                    name={el.name}
                                    price={el.price}
                                    count={el.count}
                                />
                    })
                }
            </div>
            {cartItems.length <= 0 ? <h2><Link to="/store">Start Shopping</Link></h2> : <button id="remove_all" onClick={handleDeleteAll}>Clear Cart</button>}
        </div>
    )
}

function CartProduct(props) {

    const dispatch = useDispatch();

    const handleDelete = (e) => {
        toast(`${props.name} deleted.`)
        dispatch(removeCart(props.id));
    }

    return (
        <div className="cart-product">
                <img src={props.img} alt="pic" />
                <h3>Name<br></br> <span style={{color: "royalblue"}}>{props.name}</span></h3>
                <h3>Quantity<br></br> <span style={{color: "royalblue"}}>{props.count}</span></h3>
                <h3>Price<br></br> <span style={{color: "royalblue"}}>{props.price}</span></h3>
                <button id="delete-cart" onClick={handleDelete}>
                    <span className="fa fa-trash"></span>
                </button>
        </div>
    )
}

function Summary() {

    const cartItems = useSelector(state => state.cart.cart);

    const [rawPrice,setRawPrice] = useState(0);
    const [promo,setPromo] = useState("");
    const [totalCost,setTotalCost] = useState(0);

    useEffect(() => {
        if (cartItems.length >= 0) {
            let raw = getRawPrize(cartItems);
            setRawPrice(raw);
            setTotalCost(raw);
        }
    },[cartItems]);

    const handlePromo = (e) => {
        setPromo(e.target.value);
    }

    const applyPromo = (e) => {
        if (promo === "GIFT2YOU") {
            let discounted = rawPrice - (0.5 * rawPrice);
            setTotalCost(discounted);
            toast.success(`${promo} code activated.`)
            setPromo("");
        }
    }

    const getRawPrize = (arr) => {
        let sum = 0;
        for (let i of arr) {
            let count = i.count;
            let price = parseFloat(i.price.split('$')[1])
            sum += price*count;
        }
        return sum;
    }

    return (
        <div className="summary">
            <h2>Order Summary</h2>
            <div className="summary-info">
                <h4>Total Items Count: {cartItems.length}</h4>
                <h4>Raw Price: ${rawPrice}</h4>
                <label htmlFor="promo">PROMO CODE</label>
                <input type="text" id="promo_code" placeholder="Enter your code" onChange={handlePromo} value={promo}/>
                {
                    rawPrice === totalCost ? <button onClick={applyPromo}>Apply</button> : <button onClick={applyPromo} disabled>Apply</button>
                }
            </div>
            <p>(*calculated after applying discount on products)</p>
            <h3>Total Cost</h3>
            <h2 id="total_cost">${totalCost}</h2>
            {
                totalCost !== rawPrice ? <p>(50% discounted by promo code "GIFT2YOU")</p> : null
            }
            <button id="check-out"><Link to="/store/cart/payment" style={{color:"white",textDecoration: "none"}}>Check out</Link></button>
        </div>
    )

}

export default CartPage;