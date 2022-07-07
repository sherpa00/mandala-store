import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCurrentProduct } from "../../slices/currentProductSlice";
import "./singleProduct.css";


function SingleProduct(props) {

    const dispatch = useDispatch();

    const hanleCurrentPrductAdd = () => {
        dispatch(addCurrentProduct(props.productInfo));
    }

    const newPath = `/store/product/${props.productInfo.name}`;

    return ( 
        <div className="single-product">
            <img src={props.productInfo.img} alt="pic" />
            <h3 id="name">{props.productInfo.name}</h3>
            <h2 id="price">{props.productInfo.price}</h2>
            <p style={{margin: "5px"}}>Category: <b>{props.productInfo.type}</b></p>
            <p id="ratings" style={{margin: "5px"}}>{props.productInfo.stars} <span className="fa fa-star"></span></p>
            <p id="quantity" style={{margin: "4px",marginBottom: "20px"}}>Qty: <b>{props.productInfo.quantity}</b></p>
            <button onClick={hanleCurrentPrductAdd}><Link to={newPath} style={{textDecoration: "none",color: "black"}}>Get it <span className="fa fa-arrow-right"></span></Link></button>
        </div>
     );
}

export default SingleProduct;