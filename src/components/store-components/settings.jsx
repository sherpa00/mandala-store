import { deleteUser, getAuth } from "firebase/auth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../../App";
import db from "./firebase-firestore";
import "./settings.css";

const user = sessionStorage.getItem("uid");

function Settings() {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");

    useEffect(() => {
        getDoc(doc(db,"users",user)).then((data) => {
            setUsername(data.data().username);
            setEmail(data.data().email);
        })
    },[])

    const navigate = useNavigate();

    const handleSignOut = (e) => {
        toast.success("Logged out successfully");
        sessionStorage.removeItem("uid");
        console.log(sessionStorage.getItem("uid"));
        navigate("/");
        window.location.reload();
    }

    const handleDeleteAcc = (e) => {
        // delete the user and it's related doc
        //delete user
        let currentUser = auth.currentUser;

        deleteUser(currentUser).then(() => {
            deleteDoc(doc(db,"users",user)).then(() => {
                console.log("Doc deleted");
                window.sessionStorage.removeItem("uid");
                console.log("user deleted");
                navigate("/")
                toast.success("Account deleted.")
            })
        }).catch((err) => {
            console.log("error occured");
        })
    }

    return ( 
        <div className="settings">
            <h2><span className="fa fa-cog"></span> Account Settings</h2>
            <div className="settings-cont">
                <p><span className="fa fa-user"></span><br></br>Username: <b>{username}</b></p>
                <p><span className="fa fa-envelope"></span><br></br>Email: <b>{email}</b></p>
                <button id="sign_out" onClick={handleSignOut}>sign out</button>
                <button id="delete_acc" onClick={handleDeleteAcc}>Delete Account</button>
            </div>
        </div>
     );
}

export default Settings;