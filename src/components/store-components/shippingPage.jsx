import { Link } from "react-router-dom";
import "./shippingPage.css";

function ShippingPage() {

    return ( 
        <div className="shipping-page">
            <h2 id="heading">Payment Details</h2>
            <p>Choose a payment method below:</p>
            <ul>
                <li id="selected">
                    <span className="fa fa-credit-card"></span><br></br>
                    pay with creditCard
                </li>
                <li>
                    <span className="fa fa-cc-paypal"></span><br></br>
                    pay with paypal
                </li>
                <li>
                    <span className="fa fa-cc-mastercard"></span><br></br>
                    pay with mastercard
                </li>
                <li>
                    <span className="fa fa-truck"></span><br></br>
                    pay on delivery
                </li>
            </ul>

            <div className="shipping_cont">
                <form id="shipping_details">
                    <h3>1) Shipping Details</h3>
                    <label>
                        Full Name:<br></br>
                        <input type="text" id="username" placeholder="Sanjose Rai" required/>
                    </label>
                    <label>
                        Country: <br></br>
                        <input type="text" id="country" placeholder="Nepal" required/>
                    </label>
                    <label>
                        City: <br></br>
                        <input type="text" id="city" placeholder="pokahra" required/>
                    </label>
                    <label>
                        Address: <br></br>
                        <input type="text" id="address" placeholder="lakeside-2,fewa-lake" required/>
                    </label>
                    <label>
                        Phone Number: <br></br>
                        <input type="text" id="phone" placeholder="807334872" required/>
                    </label>
                </form>

                <form id="shipping_card">
                    <h3>2) Card Details</h3>
                    <label>
                        Card Holder Name: <br></br>
                        <input type="text" id="card_holder_name" placeholder="sanjose Rai" required/>
                    </label>
                    <label>
                        Card Number: <br></br>
                        <input type="text" id="card_number" placeholder="9****" required/>
                    </label>
                    <label>
                        Expire Date: <br></br>
                        <input type="date" id="date" placeholder="2011/2/2" required/>
                    </label>
                    <label>
                        CVC Number: <br></br>
                        <input type="text" id="cvc" placeholder="345" required/>
                    </label>
                    <label>
                        Remarks: <br></br>
                        <input type="text" id="remarks" placeholder="for shopping art" required/>
                    </label>
                </form>
            </div>
            
            <div className="shipping_btns">
                <button style={{background: "whitesmoke"}}>
                    <Link to="/store" style={{color: "black",textDecoration: "none"}}>Return to Store</Link>
                </button>
                <button style={{background:"lime"}} type="submit">Confirm</button>
            </div>
        </div>
     );
}

export default ShippingPage;