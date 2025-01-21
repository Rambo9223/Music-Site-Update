// import react hooks 
import React,{ useState,useEffect } from "react";
// bootstrap components
import {Modal,Button} from "react-bootstrap";
import {useForm} from "react-hook-form"
// async functions to server/db
import LoginAdmin from "./Backend-Async/LoginAdmin";
import Manage from "./Manage";
import MultiLine from "./MultiLine";

/* Contonder with the login form to make it relevent to page */

/* Use this function to let admin login*/
function Login(){

    const [auth,setAuth] = useState();
    // bool used to toggle modal
    const [bool,setBool] = useState(false);
    // submitted is boolean variable used to toggle submitted display of modal
    const [submitted,setSubmitted] = useState(false);
    const [success,setSuccess] = useState();
    const [err,setErr] = useState(); 
    // used to change display of logout/login button depending on device being used to view the app
    
    // initalise the react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      
      const onSubmit = (data) => {
            // login user
            LoginAdmin(data).then((res)=>{
                console.log(res);
                if(res.ok===true){// if response object doesn't contain Error
                localStorage.setItem("user",JSON.stringify(res));
                localStorage.removeItem("timer");
                setSuccess(MultiLine(`Welcome - ${res.loggedIn}.\nYou are now logged in.\nYou may close this window`)) 
                // change modal display 
                setSubmitted(true);
                // if error, alert error
                reset();
                }else{
                    setErr(res.message);
                }
                });
                 
      };


    // ToggleBool changes bool and resets
    // form display by changin submitted to false
    // add the reload parts of this to the login route????
    function ToggleBool(){
        setBool(!bool);
        if(bool===true&&submitted===false){reset();}
        if(bool===true&&submitted===true){
        setSubmitted(false);
        // trigger page reload to access local storage in nav page
        window.location.reload();
        }
    }
    
/* When user is logged in we add the login info to local storage 
so if they exit the app or refresh the session is stored until they 
log out */

useEffect(() => {
    // when page loads
    const stored = JSON.parse(localStorage.getItem("user"));  
    // if no user exists - end 
    // if user exists
    if (stored!==null) {
        //console.log(stored);
    setAuth(stored);
    // what to do if logged in?
    }
  }, []);

    
    /* The Login Form */
    function Form(){
    return (
        <>
        <div>
    <Modal show={bool} onHide={ToggleBool}>
        <Modal.Header closeButton>
        <Modal.Title>
          <h2 className="text-dark">Admin Login</h2>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {(submitted===false)?
        <>
        <form className="new-item-form" onSubmit={handleSubmit(onSubmit)}>
          {success && <p className="success-msg">{success}</p>}
          {err && <p className="errorMsg">{err}</p>}
          <label className="form-labels">Username:</label>
          <br />
          <input
            className="form-inputs"
            type="text"
            placeholder="Enter your username."
            {...register("username", {
              required: "Username is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Username is not valid.",
              },
            })}
          />
          {errors.username && <p className="errorMsg">{errors.username.message}</p>}
          <br />
          <label className="form-labels">Password:</label>
          <input
            className="form-inputs"
            type="password"
            placeholder="Enter your password."
            name="password"
            {...register("password", {
              required: "Password is required.",
            })}
          />
         
          {errors.password && <p className="errorMsg">{errors.password.message}</p>}
          <br />
          <Button variant="primary" type="submit">
            Send
          </Button>
          {/*<p className="success-msg">{success}</p> */}
        </form>
        </>:<>
        {(success!==null&&success!=="")?success.map((line)=>{
            let key = Math.floor((Math.random()*1000) * Number(success.indexOf(line)+1));
            return <p className="success-msg" key={key}>{line}</p>
        }):<p className="errorMsg">{err}</p>}
        </>}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={ToggleBool}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>
    </div>
        </>
    )}
    return (
    <div>    
    {(bool===true)?<Form/>:null/*if bool is true show form */}
    {(auth!==undefined)?/* is there is a user logged in ie auth = token
    display the nav bar layout for the type of user that is logged in */
    <>
    <br className="break-small"/>
    <h3>Welcome {auth.loggedIn}</h3>
    <br></br>
    <div className="nav-container">
    <Manage token={auth.token}/>
    </div>
    </>:<>
    <Button id="login-button" variant="primary" className="rounded-pill" onClick={ToggleBool}>Login</Button>
    </>}
    </div>
    )
}
export default Login