import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import "./forYou.css";
import Loading from "./loader";
import SingleProduct from "./SingleProduct";

function ForYou() {

    const [foryouList,setforyouList] = useState([]);
    const [load,setLoad] = useState(true);

    // global state productslist
    const productList = useSelector(state => state.productsList.productsList);

    useEffect(() => {
        if (productList.length >= 60) {
            let arr = [];
            let forList = [];
            while (arr.length < 20) {
                let rand = Math.floor(Math.random() * 60);
                if (!arr.includes(rand)) {
                    arr.push(rand)
                }
            }
            for (let i of arr) {
                forList.push(productList[i])
            }
            setforyouList(forList);
            setLoad(false);
        }
    },[productList]);

    return ( 
        <div className="for-you-cont">
            <h2 id="for_you_heading">
                For You <span className="fa fa-smile-o"></span>
            </h2>
            <div className="for_you">
                {
                    load ? <Loading/> : foryouList.map((el) => {
                        return <SingleProduct
                                    key={el.name}
                                    productInfo={el}
                                />
                    })
                }
            </div>
        </div>
     );
}

export default ForYou;