import { createRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link,useNavigate } from "react-router-dom";
import gif from "../images/about-us.gif";
import "../landingHome.css";

function LandingHomePage() {
    return (
        <>
            <header>
                <nav>
                    <NavBar/>
                </nav>
                <Heading/>
            </header>
            <main>
                <AboutUs/>
                <Services/>
                <Contact/>
            </main>
            <footer>
                <Footer/>
            </footer>

        </>
     );
}

function NavBar() {

    const ulRef = createRef();

    const handleShowAndHideNav = (e) => {
        const text = e.target.textContent;
        if (text === "menu") {
            e.target.textContent = "close";
            //e.target.parentElement.parentElement.style.height = "30vh";
            ulRef.current.style.opacity = "1";
            ulRef.current.style.left = "-1%";
        } else {
            e.target.textContent = "menu";
            //e.target.parentElement.parentElement.style.height = "15vh";
            ulRef.current.style.left = "-150%";
            ulRef.current.style.opacity = "0";
        }
    }

    const navigate = useNavigate();

    const handleNavigate = (val) => {
        navigate(val);
    }

    return ( 
        <>
            <h1>MANDALA-STORE</h1>
            <ul ref={ulRef}>
                <li key="home" id="home"><a href="#home">HOME</a></li>
                <li key="store" id="store"><Link to="/store">STORE</Link></li>
                <li key="help" id="help"><a href="#help">HELP ?</a></li>
                <li key="log-in" id="log-in">
                        <button onClick={() => handleNavigate("/login")}>
                            LOGIN <span className="fa fa-sign-in"></span>
                        </button>
                </li>
            </ul>
            <p id="bar">
                <span className="material-symbols-outlined" onClick={handleShowAndHideNav}>
                menu
                </span>
            </p>
            
        </>
     );
}

function Heading() {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    },[])

    return ( 
        <div className="heading" id="home">
            <div className="info" data-aos="fade-up" data-aos-duration="2000">
                <h2>
                    <span id="one">Be </span> <span id="two">Artistic</span>, <span id="three">Be </span> <span id="four">You</span> <br></br>
                    Fill your world with Nepali Arts and Magic with us.
                </h2>
                <div className="btnGroup">
                    <Link to="/store">
                        <button id="start-shoping">
                            Start Shoping
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button id="sign-up">
                                Sign-up
                        </button>
                    </Link>
                </div>
            </div>
            <div className="image-cont" data-aos="fade-up" data-aos-duration="1500">
                
            </div>
        </div>
     );
}

function AboutUs() {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    },[])

    return ( 
        <div className="about-us" id="about-us">
            <img src={gif} alt="gif" data-aos="fade-up" data-aos-duration="2000" />
            <div className="about-us-info" data-aos="fade-up" data-aos-duration="2000">
                <h2>
                    Your One stop destination for buying authentic arts and items.
                </h2>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste repudiandae eligendi cum quaerat numquam praesentium, beatae doloribus deleniti ut doloremque perferendis qui dolores provident perspiciatis in similique tempore obcaecati. Explicabo!
                </p>
                <button>
                    Read More
                </button>
            </div>
        </div>
     );
}

function Services() {
    return ( 
        <div className="services" id="services">
            <h2 data-aos="fade-up" data-aos-duration="2000">What we Offer</h2>
            <p id="service-info" data-aos="fade-up" data-aos-duration="2000">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, quibusdam distinctio soluta atque aliquam ut sed. Nam minus rerum ad animi laudantium, dolor, consequuntur ipsam, officiis deserunt corporis voluptatibus? Ad.</p>
            <ul>
                <li data-aos="zoom-in" data-aos-duration="1000">
                    <span className="material-symbols-outlined" id="one">
                    design_services
                    </span> <br></br>
                    Mandala-Arts
                </li>
                <li data-aos="zoom-in" data-aos-duration="1000">
                    <span className="material-symbols-outlined" id="two">
                    palette
                    </span> <br></br>
                    Paintings
                </li>
                <li data-aos="zoom-in" data-aos-duration="1000">
                    <span className="material-symbols-outlined" id="three">
                    anchor
                    </span> <br></br>
                    Local Souvineirs
                </li>
                <li data-aos="zoom-in" data-aos-duration="1000">
                    <span className="material-symbols-outlined" id="four">
                    temple_hindu
                    </span> <br></br>
                    Ancient Items
                </li>
            </ul>
            <div className="services-cont">
                <div className="mandala-service" data-aos="zoom-in-right" data-aos-duration="1000">
                    <h3>Mandala Arts</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic enim modi exercitationem dolor ipsum libero facilis consequatur voluptas, unde repudiandae iure. Tenetur quos explicabo</p>
                    <button>Let's Shop</button>
                </div>
                <div className="paintings-service" data-aos="zoom-in-left" data-aos-duration="1000">
                    <h3>Paintings</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic enim modi exercitationem dolor ipsum libero facilis consequatur voluptas, unde repudiandae iure. Tenetur quos explicabo</p>
                    <button>Let's Shop</button>
                </div>
                <div className="local-service" data-aos="zoom-in-right" data-aos-duration="1000">
                    <h3>Local Items</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic enim modi exercitationem dolor ipsum libero facilis consequatur voluptas, unde repudiandae iure. Tenetur quos explicabo</p>
                    <button>Let's Shop</button>
                </div>
                <div className="ancient-service" data-aos="zoom-in-left" data-aos-duration="1000">
                    <h3>Ancient Items</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic enim modi exercitationem dolor ipsum libero facilis consequatur voluptas, unde repudiandae iure. Tenetur quos explicabo</p>
                    <button>Let's Shop</button>
                </div>
            </div>
        </div>
     );
}

function Reviews() {
    return ( 
        <div className="reviews">

        </div>
     );
}

function Contact() {
    return ( 
        <div className="contact" name="contact" data-aos="fade-up" data-aos-duration="2000">
            <h2>Have any doubts ? Contact Us</h2>
            <form>
                <label htmlFor="email">Your Email</label>
                <input id="email" type="text" placeholder="..email"/>
                <label htmlFor="name">Your Name</label>
                <input id="name" type="text" placeholder="..name"/>
                <label id="message" htmlFor="message">
                    Your Message
                </label>
                <textarea placeholder="...type message" id="message">
                </textarea>
                <button type="submit">
                    Submit
                </button>
            </form>
            <h3 data-aos="zoom-in" data-aos-duration="1000">
                Let's get Started
            </h3>
            <Link to="/store">
                <button id="start" data-aos="zoom-in" data-aos-duration="1000">
                    Start Shopping
                </button>
            </Link>
        </div>
     );
}


function Footer() {
    return ( 
        <>
            <div className="list">
                <ul id="navs">
                    <li>Home</li>
                    <li>Devlopers</li>
                    <li>Jobs</li>
                    <li>coummunity</li>
                    <li>API</li>
                </ul>
                <ul id="social">
                    <li>
                        <span className="fa fa-facebook"></span>
                    </li>
                    <li>
                        <span className="fa fa-instagram"></span>
                    </li>
                    <li>
                        <span className="fa fa-twitter"></span>
                    </li>
                    <li>
                        <span className="fa fa-google"></span>
                    </li>
                </ul>
            </div>
            <p>Created by ChaWang</p>
            <p>@ChaWang_website.co</p>
        </>
     );
}





export default LandingHomePage;