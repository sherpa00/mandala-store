import {getDownloadURL, ref} from "firebase/storage";
import {Swiper,SwiperSlide} from 'swiper/react';
// import required modules
import { Autoplay,Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./front-heading.css";
import storage from "./firebase-Storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loader";
import { Link } from "react-router-dom";
import { addCurrentProduct } from "../../slices/currentProductSlice";


//create ref to file mandala/11.jpg;
const mandala11Ref = ref(storage,"mandala/11.png");

//create ref to file art/5.jpg;
const art5Ref = ref(storage,"art/5.jpg");

//create ref to file local_items/1.jpg;
const local3Ref = ref(storage,"local_items/3.jpg");

//create ref to file anceint_items/1.jpg;
const anceint1Ref = ref(storage,"anceint_items/11.jpg");


function FrontHeading() {

    const [newArr,setnewArr] = useState([]);

    const [load,setLoad] = useState(true);

    //global productslist
    const productList = useSelector(state => state.productsList.productsList)

    useEffect(() => {
        if (productList.length >= 60) {
            let arr = [];
            let arrList = [];
            while (arr.length < 4) {
                let rand = Math.floor(Math.random() * 60);
                if (!arr.includes(rand)) {
                    arr.push(rand);
                }
            }
            for (let i of arr) {
                arrList.push(productList[i])
            }
            setnewArr(arrList);
            setLoad(false);
        }
    },[productList])

    return ( 
        <div className="front-heading">
            <FrontCategories/>
            {
                load ? <Loading/> : <FrontBanner array={newArr} />
            }
        </div>
     );
}

export default FrontHeading;


function FrontCategories() {
    return (
        <div className="front-categories">
            <ul>
                <li style={{background: "lightgreen"}}><Link to="/store/category/mandala" style={{textDecoration: "none",color: "black"}}>Mandala Arts</Link></li>
                <li style={{background: "skyblue"}}><Link to="/store/category/art" style={{textDecoration: "none",color: "black"}}>Paintings</Link></li>
                <li style={{background: "tan"}}><Link to="/store/category/local_item" style={{textDecoration: "none",color: "black"}}>Local Items</Link></li>
                <li style={{background: "orchid"}}><Link to="/store/category/anceint_item" style={{textDecoration: "none",color: "black"}}>Anceint Items</Link></li>
            </ul>
        </div>
    )
}

function FrontBanner({array}) {

    const dispatch = useDispatch();

    const handleCurrentProductChange = (ind) => {
        dispatch(addCurrentProduct(array[ind]))
    }

    return ( 
        <div className="front-banner">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>

                
                    <div id="banner">
                        <h2>{array[0].name}</h2>
                        <img src={array[0].img} alt="pic"/>
                        <p>{array[0].description}</p>
                        <button onClick={() => handleCurrentProductChange(0)}><Link to={`/store/product/${array[0].name}`} style={{color: "black",textDecoration: "none"}}>Grab it</Link></button>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div id="banner">
                        <h2>{array[1].name}</h2>
                        <img src={array[1].img} alt="pic"/>
                        <p>{array[1].description}</p>
                        <button onClick={() => handleCurrentProductChange(1)}><Link to={`/store/product/${array[1].name}`} style={{color: "black",textDecoration: "none"}}>Grab it</Link></button>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div id="banner">
                        <h2>{array[2].name}</h2>
                        <img src={array[2].img} alt="pic"/>
                        <p>{array[2].description}</p>
                        <button onClick={() => handleCurrentProductChange(2)}><Link to={`/store/product/${array[2].name}`} style={{color: "black",textDecoration: "none"}}>Grab it</Link></button>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div id="banner">
                        <h2>{array[3].name}</h2>
                        <img src={array[3].img} alt="pic"/>
                        <p>{array[3].description}</p>
                        <button onClick={() => handleCurrentProductChange(3)}><Link to={`/store/product/${array[3].name}`} style={{color: "black",textDecoration: "none"}}>Grab it</Link></button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
     );
}

