import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc,collection,doc,setDoc } from "firebase/firestore";
import {getAuth,createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import "../login.css";
import { useDispatch } from "react-redux";
import { addUserInfo, removeUserInfo } from "../slices/userInfoSlice";
import db from "./store-components/firebase-firestore";
import { async } from "@firebase/util";
import { auth } from "../App";


function SignIn({ app }) {

    // global store dispatcher
    const dispatch = useDispatch();

    const [nameError,setnameError] = useState("");
    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [passwordError2,setPasswordError2] = useState("");

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [password2,setPassword2] = useState("");

    // Initialize Firebase Authentication and get a reference to the service
    const authData = auth;

    // useNavigate for routing
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let emailValidate = email.match(regexEmail);
        let noError = true;

        // email and password validation
        if (name === "") {
            setnameError("Error ! Your username cannot be empty.")
            noError = false;
        } else {
            setnameError("");
        }
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
        }  else {
            setPasswordError("");
        }

        if (password2 !== password) {
            setPasswordError2("Error ! Your Password does not Match !");
            noError = false;
        } else if (password2 === "") {
            setPasswordError2("Error ! Your Password cannot be empty !");
            noError = false;
        } else {
            setPasswordError2("");
        }
        
        // after validation of email and password submit and create a new account
        if (noError) {
            setEmailError("");
            setPasswordError("");
            setPasswordError2("");
            console.log(`Email: ${email} and Password: ${password}`);
            // here do sign-in
            createUserWithEmailAndPassword(authData,email,password).then((userCreditentials) => {
                const user = userCreditentials.user;
                console.log(user);

                // update profile name
                updateProfile(user,{
                    displayName: name
                }).then(() => {

                    // add a new collection 
                    
                    setDoc(doc(db,"users",user.uid),{
                        username: name,
                        email: user.email,
                        uid: user.uid,
                        cart: []
                    });


                    // dispatch global store state
                    dispatch(removeUserInfo());
                    dispatch(addUserInfo(user.uid));
                }).catch((error) => {
                    console.log(error.message);
                })

                // store access token of new user
                window.sessionStorage.setItem("uid",user.uid);

                // navigate to store page
                toast.success("Sign-Up Successful",{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"colored",
                })

                setTimeout(() => {
                    navigate("/store");
                },[])
                
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
                    theme: "colored",
                });
            })
            // empty email, password and password2
            setName("");
            setEmail("");
            setPassword("");
            setPassword2("");
        }
    }

    // function to add a doc collections
    

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const password2Change = (e) => {
        setPassword2(e.target.value);
    }

    return ( 
        <div className="login">
            <h1>Mandala Store</h1>
            <p id="info">
                <span id="hello">Your Journey Starts here,</span><br></br>
                Let's create a beautiful art!
            </p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your username" value={name} onChange={nameChange}/>
                {
                    nameError === "" ? null : <p id="error" style={{color: "crimson",marginTop: "0px"}}>{nameError}</p>
                }

                <input type="email" placeholder="Your email" value={email} onChange={emailChange}/>
                {
                    emailError === "" ? null : <p id="error" style={{color: "crimson",marginTop: "0px"}}>{emailError}</p>
                }
                <input type="password" placeholder="Your password" value={password} onChange={passwordChange}/>
                {
                    passwordError === "" ? null : <p id="error" style={{color: "crimson",marginTop: "0px"}}>{passwordError}</p>
                }

                <input type="password" placeholder="Retype password" value={password2} onChange={password2Change}/>
                {
                    passwordError2 === "" ? null : <p id="error" style={{color: "crimson",marginTop: "0px"}}>{passwordError2}</p>
                }
                <button type="submit" style={{marginTop: "10px"}}>
                    SIGN-UP
                </button>

                <p id="sign-in">
                    Already have an acccount? <Link to="/login">Log in</Link>
                </p>
            </form>
        </div>
     );
}

export default SignIn;