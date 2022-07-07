import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCurrentProduct } from "../../slices/currentProductSlice";
import { addSearch } from "../../slices/searchSlice";
import Loading from "./loader";
import "./searchPage.css";

function SearchPage() {

    const resultsRef = createRef();

    //global state search text
    const searchText = useSelector(state => state.search.search);

    //global state products
    const products = useSelector(state => state.productsList.productsList);

    const [showFilter,setShowFilter] = useState(false);
    const [priceFilter,setPriceFilter] = useState("");
    const [categoriesFilter,setCategoriesFilter] = useState([]);

    const [searchRes,setSearchRes] = useState([]);

    const dispatch = useDispatch();

    const handleCategories = (e) => {
        if (e.target.checked) {
            setCategoriesFilter([...categoriesFilter,e.target.value])
        } else {
            if (categoriesFilter.includes(e.target.value)) {
                let newState = categoriesFilter.filter((el) => el !== e.target.value);
                setCategoriesFilter(newState);
            }
        }
    }

    const handlePrice = (e) => {
        if (e.target.checked) {
            setPriceFilter(e.target.value);
        } else {
            setPriceFilter("");
        }
    }

    const handleShowFilter = (e) => {
        setShowFilter(!showFilter);
    }

    const handleSearchTextChange = (e) => {
        dispatch(addSearch(e.target.value));
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let filtered = [];

        if (searchText === "") {
            filtered = products;
        } else {
            filtered = products.filter((el) => el.name.indexOf(searchText) >= 0);
        }

        if (categoriesFilter.length > 0) {
            let tempFiltered = [];
            filtered.map((el) => {
                if (categoriesFilter.includes(el.type)) {
                    tempFiltered.push(el);
                }
            })
            filtered = tempFiltered;
        }

        if (priceFilter !== "") {
            if (priceFilter === "1-5") {
                filtered = filtered.filter((el) => Number(el.price.split("$")[1]) <= 5);
            } else if (priceFilter === "6-10") {
                filtered = filtered.filter((el) => Number(el.price.split("$")[1]) <= 10 && Number(el.price.split("$")[1]) >= 6);
            } else if (priceFilter === "11-20") {
                filtered = filtered.filter((el) => Number(el.price.split("$")[1]) <= 20 && Number(el.price.split("$")[1]) >= 11);
            } else if (priceFilter === "20") {
                filtered = filtered.filter((el) => Number(el.price.split("$")[1]) >= 21);
            } else if (priceFilter === "all") {
                setPriceFilter("");
            }
        }
        resultsRef.current.scrollIntoView();
        setSearchRes(filtered);
    }

    if (products.length <= 0) {
        return <Loading/>
    }

    return ( 
        <div className="search-page">
            <form className="search-cont" onSubmit={handleSearch}>
                <input type="search" placeholder="search products..." id="inp" value={searchText} onChange={handleSearchTextChange} />
                <button type="submit">Search</button>
                <p>Filter search <br></br><span className="fa fa-angle-down" onClick={handleShowFilter}>
                
                </span></p>
                {
                    !showFilter ? null : <div className="filter">
                    <h3>Categories</h3>
                    <div id="categories-form">
                        <label>
                            <input type="checkbox" id="categories-checkbox" value="mandala" onChange={handleCategories}/> <br></br>Mandala
                        </label>
                        <label>
                            <input type="checkbox" id="categories-checkbox" value="art" onChange={handleCategories}/> <br></br>Painting
                        </label>
                        <label>
                            <input type="checkbox" id="categories-checkbox" value="local_item" onChange={handleCategories}/> <br></br>Local Items
                        </label>
                        <label>
                            <input type="checkbox" id="categories-checkbox" value="anceint_item" onChange={handleCategories}/> <br></br>Anceint Items
                        </label>
                    </div>
                    <h3>Price</h3>
                    <div id="price-form">
                        <label>
                            <input type="radio" id="price-radio" name="price-radio" value="all" onChange={handlePrice}/> <br></br> all
                        </label>
                        <label>
                            <input type="radio" id="price-radio" name="price-radio" value="1-5" onChange={handlePrice}/> <br></br>$1-$5
                        </label>
                        <label>
                            <input type="radio" id="price-radio" name="price-radio" value="6-10" onChange={handlePrice}/> <br></br>$6-$10
                        </label>
                        <label>
                            <input type="radio" id="price-radio" name="price-radio" value="11-20" onChange={handlePrice}/> <br></br>$11-$20
                        </label>
                        <label>
                            <input type="radio" id="price-radio" name="price-radio" value="20" onChange={handlePrice}/> <br></br> $21 above
                        </label>
                    </div>
                </div>
                }
            </form>
            <SearchResults filteredProducts={searchRes} search={searchText} resultsRef={resultsRef}/>
        </div>
     );
}

function SearchResults({filteredProducts,search,resultsRef}) {

    useEffect(() => {
        console.log(filteredProducts);
    },[filteredProducts]);

    

    return ( 
        <div className="search-results" ref={resultsRef}>
            <h2>search results for "{search}" <br></br>found {filteredProducts.length} from 60</h2>
            <div className="search-results-cont">
                {
                    filteredProducts.length <= 0 ? null : filteredProducts.map((el) => {
                        return <SingleResult productInfo={el} key={el.name} />
                    })
                }
            </div>
        </div>
     );
}

function SingleResult(props) {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addCurrentProduct(props.productInfo));
    }

    const newPath = `/store/product/${props.productInfo.name}`;

    const getStars = (num) => {
        if (num === "1") {
            return <p id="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </p>
        }
        if (num === "2") {
            return <p className="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </p>
        }
        if (num === "3") {
            return <p id="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </p>
        }
        if (num === "4") {
            return <p id="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-o"></span>
                    </p>
        }
        if (num === "5") {
            return <p id="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </p>
        }
        if (num === "1.5") {
            return <p id="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-half-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </p>
        }
        if (num === "2.5") {
            return <p id="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-half-o"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                    </p>
        }
        if (num === "3.5") {
            return <p id="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-half-o"></span>
                        <span className="fa fa-star-o"></span>
                    </p>
        }
        if (num === "4.5") {
            return <p id="rating">
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-half-o"></span>
                    </p>
        }
    }

    const data = props.productInfo

    return ( 
        <div className="single-result">
            <img src={data.img} alt="pic" />
            <div className="single-result-info">
                <h3 id="name">{data.name}</h3>
                <p>Category: <b>{data.type}</b></p>
                {
                    getStars(data.stars)
                }
                <h1 style={{color: "royalblue",margin: "3px"}}>{data.price}</h1>
                <p id="desc">
                    {data.description}
                </p>
                <button id="get-it" onClick={handleClick}><Link to={newPath} style={{color: "black",textDecoration: "none"}}>Get it <span className="fa fa-angle-right"></span></Link></button>
            </div>
        </div>
     );
}

export default SearchPage;