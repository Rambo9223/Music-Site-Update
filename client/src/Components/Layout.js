// page for links displayed in navbar
import { useState,useEffect } from "react";
import { Outlet,Link } from "react-router-dom"
import { Button } from "react-bootstrap";
import LogoutAdmin from "./Backend-Async/LogoutAdmin";
import AutoLogoutPopUp from "./AutoLogoutPopUp";
import Clock from "./Clock";

export default function Layout(){

  const [auth,setAuth] = useState(undefined);//admin jwt token
  const [response,setResponse] = useState();// server response variable 
  const [bool,setBool] = useState();// bool for popup display 
  const [send,setSend] = useState({type:"",message:""});//popup props
  // our local storage obejct user
  let stored = JSON.parse(localStorage.getItem("user"));

  /*The ToggleBool function is used 
  handle a auto logout and clear the local storage 
  and reload the page */

  function ToggleBool(){
    setBool(!bool);
    if(response!==null){
    if(response.ok===true){
        localStorage.clear();
        window.location.reload();
    }
}}

/*useEffect hook is used to check that there is a user
logged in and thus local storage variable stored has value */
  useEffect(()=>{
    if (stored!==null&&auth===undefined) {
        setAuth(stored.token);
    }
},[auth,stored])

  // layout depending on user
  let userLayout 
    // if admin
    if(auth!==undefined){
      userLayout = <ul className="nav-routes">
        
      <li>
        <Link className="route" to="/">Home</Link>
      </li>
      <li>
        <Link className="route" to="/news">News</Link>
      </li>
      <li>
        <Link className="route" to="/media">Media</Link>
      </li>
      <li>
        <Link className="route" to="/contact">Contact</Link>
      </li>
      <li>
        <Link className="route" to="/admin">Admin</Link>
      </li>
      <li>
      <div id="logout-button">
      <Button  variant="primary" className="rounded-pill" onClick={()=>{
        LogoutAdmin(auth).then((res)=>{// onclick logout admin passing token to server
          setResponse(res);// set response
          if(res.ok === true){//if successful 
            setBool(true);//set bool to true to bring up popup 
            // set popup information
            setSend({type:"Notification",
            message:`${res.message}`})
            }else{
            setBool(true);//set bool to true to bring up popup 
            setSend({// set information to error
            type:"Error",
            message:`Status - ${res.status}. ${res.message}`
            })
          }
        })
        
      } }>Logout</Button>
      </div>
      </li>
      <li id="clock">
        {/* The clock element works when admin is logged in and
        a valid auth token is present */}
          <Clock token={auth}/>
      </li>
      {/* if bool is true the popup element is show displaying a message to the user */}
      {bool===true?<AutoLogoutPopUp message={send.message} type={send.type} bool={bool} ToggleBool={ToggleBool}/>:null}
    </ul>
    }else{
      // user is not admin
      userLayout = <ul className="nav-routes">
      <li>
        <Link className="route" to="/">Home</Link>
      </li>
      <li>
        <Link className="route" to="/news">News</Link>
      </li>
      <li>
        <Link className="route" to="/media">Media</Link>
      </li>
      <li>
        <Link className="route" to="/contact">Contact</Link>
      </li>
      
    </ul>
    }
    return (
        <div>
             <nav className="route-container">
              {userLayout}
              </nav>
              <Outlet />
        </div>
    )
}