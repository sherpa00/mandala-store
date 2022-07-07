import { useState,useEffect } from "react";
import SingleProduct from "./SingleProduct";
import "./newArrivals.css";
import { useSelector } from "react-redux";
import Loading from "./loader";

function NewArrivals() {
    const [newArrivalsArr,setNewArrivalsArr] = useState([]);
    const [load,setLoad] = useState(true);

    const productList = useSelector(state => state.productsList.productsList)

    useEffect(() => {
        let arr = [22,34,46,57,24,33,45,58];
        if (productList.length === 60) {
            let newArr = [];
            for (let i of arr) {
                newArr.push(productList[i]);
            }
            setNewArrivalsArr(newArr);
            setLoad(false);
        }
    },[productList]);

    return ( 
        <div className="new-arrivals-cont" id="new_arrivals">
            <h3 id="new_arrivals_heading">
                New Arrivals <span className="material-symbols-outlined">
                                favorite
                                </span>
            </h3>
            <div className="new-arrivals">
            {
                     load ? <Loading/> : newArrivalsArr.map((element) => {
                        return <SingleProduct 
                                    key={element.name}
                                    productInfo={element}
                        />
                    })
                }
            </div>
        </div>
     );
}

export default NewArrivals;