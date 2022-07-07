import React,{ useEffect, useState } from "react";
import "./trending.css";
import { useSelector } from "react-redux";
import Loading from "./loader";
import SingleProduct from "./SingleProduct";

function Trending() {

    // global state
    const productList = useSelector(state => state.productsList.productsList)
    
    const [load,setLoad] = useState(true);
    const [trendingArr,setTrendingArr] = useState([]);

    useEffect(() => {
        if (productList.length >= 60) {
            let arr = [];
            while (arr.length < 10) {
                let rand = Math.floor(Math.random() * 60);
                if (!arr.includes(rand)) {
                    arr.push(rand);
                }
            }
            let newList = [];
            for (let i of arr) {
                newList.push(productList[i]);
            }
            setTrendingArr(newList);
            setLoad(false);
        }
    },[productList]);

    return ( 
        <div className="trending-cont" id="trending">
            <h3 id="trending_heading">
                Trending Picks <span className="material-symbols-outlined">
                                trending_up
                                </span>
            </h3>
            <div className="trending">
                {
                   load ? <Loading/> : trendingArr.map((el) => {
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

export default Trending;