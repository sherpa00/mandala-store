import { createRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";
import db from "./firebase-firestore";

function NavBar() {

    const user = sessionStorage.getItem("uid");

    const cartItems = useSelector(state => state.cart.cart);

    // ref for dropdown
    const dropdownref = createRef();

    const handleHover = () => {
        dropdownref.current.style.display = "flex";
    }

    const handleOut = () => {
        dropdownref.current.style.display = "none";
    }

    const handleSearch = (e) => {
        e.preventDefault();
    }

    return ( 
        <div className="store-navbar">
            <div className="upper-nav">
                <h1 id="logo"><Link to="/store" style={{color: "wheat",textDecoration: "none"}}>Mandala Store</Link></h1>
                <form id="search" onSubmit={handleSearch}>
                    <p id="search-icon">
                         <Link to="/store/search" style={{color: "black"}}><span className="material-symbols-outlined" title="search">
                            search
                        </span></Link>
                    </p>
                    <p id="cart" title="cart"><Link to="/store/cart" style={{color: "black",textDecoration: "none"}}>
                        <i className="material-symbols-outlined">
                            shopping_cart
                        </i>
                        {
                            cartItems.length <= 0 ? null : <span id="badge">{cartItems.length}</span>
                        }
                        </Link>
                    </p>
                    {
                        !user  ? <button id="login"><Link to="/login" style={{color: "black",textDecoration: "none"}}>Login</Link></button> : <h2>
                                                                            <Link to="/store/settings"><span className="material-symbols-outlined" title="account">
                                                                                account_circle
                                                                            </span></Link>
                                                                         </h2>
                    }
                </form>
            </div>
            <div className="lower-nav">
                    <ul id="main-nav">
                        <li><Link to="/store">Home</Link></li>
                        <li id="categories" onMouseOver={handleHover} onMouseLeave={handleOut}><a href="#">
                            categories  <i className="fa fa-caret-down"></i></a>
                        </li>
                        <ul id="dropdown" ref={dropdownref} onMouseOver={handleHover} onMouseLeave={handleOut}>
                            <li><Link to="/store/category/mandala">Mandala Arts</Link></li>
                            <li><Link to="/store/category/art">Paintings</Link></li>
                            <li><Link to="/store/category/local_item">Local Items</Link></li>
                            <li><Link to="/store/category/anceint_item">Anceint Items</Link></li>
                        </ul>
                        
                        <li><Link to="/store/search">search</Link></li>
                    </ul>
            </div>
            <div className="bottom-nav">
                <ul>
                    <li><Link to="/store"><span className="fa fa-home"></span></Link></li>
                    <li><Link to="/store/category/mandala"><span className="fa fa-th-list"></span></Link></li>
                    <li id="cart">
                        <Link to="/store/cart">
                            <i className="fa fa-shopping-cart"></i>
                            {
                                cartItems.length <= 0 ? null : <span id="badge" style={{lineHeight: "15px",color: "black",padding: "2px 6px",background: "coral",position: "absolute",top: "10px",fontSize: "12px",borderRadius: "50%"}}>{cartItems.length}</span>
                            }
                        </Link>
                    </li>
                    <li><Link to="/store/search"><span className="fa fa-search"></span></Link></li>
                    <li><Link to="/store/settings"><span className="fa fa-user"></span></Link></li>
                </ul>
            </div>
        </div>
     );
}

export default NavBar;