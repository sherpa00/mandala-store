import "./footer.css";

function Footer() {
    return ( 
        <footer>
            <h1>Only real men buy mandalas.</h1>
            <div className="footer-cont">
                <div className="menu">
                    <h2>Menu</h2>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Catergories</a></li>
                        <li><a href="#">Trending</a></li>
                        <li><a href="#">New Arrivals</a></li>
                        <li><a href="#">Offer Zone</a></li>
                    </ul>
                </div>
                <div className="about">
                    <h2>About</h2>
                    <ul>
                        <li><a href="#">Terms and Conditions</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Cookies and settings</a></li>
                        <li><a href="#">Jobs and support</a></li>
                        <li><a href="#">support us?</a></li>
                    </ul>
                </div>
                <div className="location">
                    <h2>Location</h2>
                    <ul>
                        <li>
                            Thamel,Kathmandu,Nepal<br></br>
                            street no. 43 <br></br>
                            +98347829389
                        </li>

                        <li>
                            Bhaktapur,Bhaktapur,Nepal<br></br>
                            street no. 22 <br></br>
                            +9828332744
                        </li>
                    </ul>
                </div>
                <div className="contact">
                    <h2>Contact</h2>
                    <ul>
                        <li>
                            PHONE: +3438802 / +977 980239297 <br></br>
                            EMAIL: www.mandalaStore@gmail.com
                        </li>
                    </ul>
                    <ul >
                        <li><a href="#"><span className="fa fa-facebook"></span></a></li>
                        <li><a href="#"><span className="fa fa-twitter"></span></a></li>
                        <li><a href="#"><span className="fa fa-google"></span></a></li>
                        <li><a href="#"><span className="fa fa-instagram"></span></a></li>
                        <li><a href="#"><span className="fa fa-youtube"></span></a></li>
                    </ul>
                </div>
            </div>
            <h3>Mandala Store</h3>
            <p>www.mandalaStore.com,All-rights Reserved.</p>
        </footer>
     );
}

export default Footer;