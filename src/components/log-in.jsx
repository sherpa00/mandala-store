import { useState } from "react";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../login.css";
import { useDispatch } from "react-redux";
import { addUserInfo, removeUserInfo } from "../slices/userInfoSlice";
import { auth } from "../App";


function LogIn({ app }) {

    // global store userInfo dispatcher
    const dispatch = useDispatch();

    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    // initial firebase authentication
    const authdata = auth;

    //useNavigate
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let emailValidate = email.match(regexEmail);
        let noError = true;

        // email and password validation
        if (email === "") {
            setEmailError("Error ! Your Email cannot be empty!");
            noError = false;
        } else if (!emailValidate) {
            setEmailError("Error ! Your Email is invalid!");
            noError = false;
        } else {
            setEmailError("");
        }

        if (password === "") {
            setPasswordError("Error ! Your Password should not be Empty!");
            noError = false;
        } else if (password.length <= 5) {
            setPasswordError("Error ! Your Password cannot be less than 6 characters.");
            noError = false;
        } else {
            setPasswordError("");
        }

        // after successful validation of email and password, submit email and password to login.
        if (noError) {
            console.log(`Email: ${email} and password: ${password}`);
            setEmailError("");
            setPasswordError("");
            //here do login logic
            signInWithEmailAndPassword(authdata,email,password).then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user);

                // add user to localstorage
                window.sessionStorage.setItem("uid",user.uid);

                // save profile name in userInfo store
                dispatch(removeUserInfo());
                dispatch(addUserInfo(user.uid));

                toast.success("LogIn Successfull",{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"colored",
                }); 

                setTimeout(() => {
                    navigate("/store")
                },1000)
            }).catch((error) => {
                const message = error.message;
                toast.error(message,{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"colored",
                });
            })
            // empty email,password
            setEmail("");
            setPassword("");
            
            
        }
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    return ( 
        <div className="login">
            <h1>Mandala Store</h1>
            <p id="info">
                <span id="hello">Welcome Back ! Buddy,</span><br></br>
                Please Login to
                Your Account!
            </p>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Your email" value={email} onChange={emailChange}/>
                {
                    emailError === "" ? null : <p id="error" style={{color: "crimson", marginTop: "0px"}}>{emailError}</p>
                }
                <input type="password" placeholder="Your password" value={password} onChange={passwordChange}/>
                {
                    passwordError === "" ? null : <p id="error" style={{color: "crimson", marginTop: "0px"}}>{passwordError}</p>
                }
                <a href="#">
                    forget Password?
                </a>
                <button type="submit">
                    LOGIN
                </button>

                <p id="sign-in">
                    Don't have acccount? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
     );
}

export default LogIn;