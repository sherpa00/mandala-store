import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import Loading from "./loader";
import "./categories.css";
import SingleProduct from "./SingleProduct";
import { useNavigate, useParams } from "react-router";

function CategoryPage() {

    const params = useParams();
    const navigate = useNavigate();

    const [showCategory,setShowCategory] = useState([]);

    const products = useSelector(state => state.productsList.productsList);

    useEffect(() => {
        const filteredList = products.filter((el) => el.type === params.type);
        setShowCategory(filteredList);
    },[params])

    const handleMandala = () => {
        //const list = products.filter((el) => el.type === "mandala");
        //setShowCategory(list);
        navigate("/store/category/mandala");
    }

    const handleArt = () => {
        //const list = products.filter((el) => el.type === "art");
        //setShowCategory(list);
        navigate("/store/category/art");
    }

    const handleLocalItem = () => {
        //const list = products.filter((el) => el.type === "local_item");
        //setShowCategory(list);
        navigate("/store/category/local_item");
    }

    const handleAnceintItem = () => {
        //const list = products.filter((el) => el.type === "anceint_item");
        //setShowCategory(list);
        navigate("/store/category/anceint_item");
    }


    if (products.length <= 0) {
        return <Loading/>
    }

    return ( 
        <div className="category-page">
            <div className="category-btn">
                <button id="mandala" onClick={handleMandala}>Mandala</button>
                <button id="art" onClick={handleArt}>Paintings</button>
                <button id="local_item" onClick={handleLocalItem}>Local Items</button>
                <button id="anceint_item" onClick={handleAnceintItem}>Anceint Items</button>
            </div>
            {
                showCategory.length <= 0 ? null : <p>Total <b>{showCategory.length}</b> products found.</p>
            }
            {
                showCategory.length <= 0 ? <p>Click any button above to show related products</p> : <div className="category_single">
                    {
                        showCategory.map((el) => {
                            return <SingleProduct
                                        key={el.name}
                                        productInfo={el}
                                    />
                        })
                    }
                </div>
            }
        </div>
     );
}

export default CategoryPage;