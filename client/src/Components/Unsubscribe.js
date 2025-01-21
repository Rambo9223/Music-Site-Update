// unsubscribe page
// example link = http://localhost:3000/unsubscribe?email=Rflan@mail.com
import newsBackground from "../Images/CC2A0054.png";
import { useState,useEffect } from "react";
import {Form,Button} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import UserSubscriber from "./Backend-Async/UserSubscriber";
import UserUnsubscribe from "./Backend-Async/UserUnsubscribe";
import UserEditSubscriber from "./Backend-Async/UserEditSubscriber";

/* This page exists on the site but is not visable as it would only be accessible by subscribers who in an email can click the link to unsubscribe */
export default function UnSubscribe(){
    
    const [user,setUser] = useState({name:"",email:""});// user details 
    const [preferences, setPreferences] = useState({ shows: false, releases:false , unsubscribe:false});// user pref

    // useEffect hook is used to retrieve the sus=bscriber details
    useEffect(()=>{
      let linkFull = String(window.location.href);// the full web link subscriber has
      let link = linkFull.substring(linkFull.indexOf("?")+1);// the subscriber info needed from the link 
      UserSubscriber(link).then((res)=>{// send the information to server to retrieve item 
        if(res.ok===true){// if success
          setUser(res.results[0]);// set user object 
          setPreferences({shows:res.results[0].preferences.shows,releases:res.results[0].preferences.releases,unsubscribe:false})
          // change preferences to match user
        }else{
          setErr(res.message.replace(/["]/g,));// display error message
        }
      }).catch((e)=>{
        //console.log(e.message);
        setErr(e.message);
      })
    },[]);

    // media queries
    const isLaptop = useMediaQuery({ query: "(min-width: 1024px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 651px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 650px)" });
    //success text 
    const [success, SetSuccess] = useState("");
    // error text 
    const [err,setErr] = useState("");

  // initialise form
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      preferences
    },
  });

  // the function that allows user to change preferences
  function HandlePref(releases, shows, unsubscribe) {    
    setPreferences({
      shows: shows,
      releases: releases,
      unsubscribe:unsubscribe
    });
  }
  // on change of details 
  const onSubmit = (data) => {
    console.log(data);
    // user wants to fully unsubscribe
    if(preferences.unsubscribe===true){
      // pass id to server 
    UserUnsubscribe(user._id).then((res)=>{
      if(res.ok === true){// if success 
        // success message
        SetSuccess(res.message);
        reset();// reset form 
      }else{// error 
        setErr(res.message);
      }
    })
    }
    else if((preferences.shows===true && preferences.unsubscribe===false) || (preferences.releases===true && preferences.unsubscribe===false)){
      // user wants to change a single preference
      let update = user;
      // update pref if changed
      update.preferences.shows = !preferences.shows;
      update.preferences.releases = !preferences.releases;
      UserEditSubscriber(update).then((res)=>{// send to server 
        if(res.ok===true){// on success 
          SetSuccess(`${res.message} ${res.data.name}`)// display success 
          reset();// reset form 
        }else{
          // else display error
          setErr(res.message);
        }
      })
    }
    else{// no changed selected, display error
      setErr("No changes selected.")
    }
  };

  const content = 
  <>
  
  {/*Subscription Form*/}
  {isTabletOrMobile?<div className="break-large"></div>:null}
  <div id = "news-form-container">
      <section className="subscription">
        <h2 className="faded">Unsubscribe</h2>
        <form className="new-item-form" onSubmit={handleSubmit(onSubmit)}>
      {success && <p className="success-msg">{success}</p>}
      {err && <p className="errorMsg">{err}</p>}
        <div className="form-control">
        <label className="form-labels">Name: {user.name!==undefined?user.name:""} </label><br/>
        <label className="form-labels">Email: {user.email!==undefined?user.email:""}</label><br/>
      </div>
      
      <div className="form-control">
      <label className="form-labels">Remove notifications of:</label>
      {(user.preferences!==undefined)?<>
      <div className="break-small"/>

        <Form.Check
          type="checkbox"
          label="Shows in my area"
          value={preferences.shows}
          checked={preferences.shows}
          
          {...register("preferences.shows", {
            onChange: (e) => {
              HandlePref(preferences.releases, e.target.checked,preferences.unsubscribe);
            },
          })}
        />
        <Form.Check
          type="checkbox"
          label="New Releases"
          value={preferences.releases}
          checked={preferences.releases}
          {...register("preferences.releases", {
            onChange: (e) => {
              HandlePref(e.target.checked, preferences.shows, preferences.unsubscribe);
            },
          })}
        />

      </>:null} 
      </div>

      <div className="form-control">
      <label className="form-labels">Remove all my info:</label>
      <div className="break-small"/>

      <Form.Check
          type="checkbox"
          label="Unsubscribe"
          value={preferences.unsubscribe}
          {...register("preferences.unsubscribe", {
            onChange: (e) => {
              HandlePref(preferences.releases, preferences.shows,e.target.checked);
            },
          })}
        />

      </div>

      <div className="form-control">
        <label></label>
        <Button variant="primary" type="submit">Unsubscribe</Button>
      </div>
    </form>
      </section>
      </div> 
   
  </>;

    return (
        <div>
             <main id="news">
      {isLaptop?<>{/*Background Image*/}
      <div id="background-news">
        <img id="news-image" src={newsBackground} alt="" />
    </div>
    <div className="break-large"></div>
    <div id="news-content-large">{content}</div>
    </>:null}
      
      {isTabletOrMobile?<><div id="background-news-small">
        <img id="news-image" src={newsBackground} alt="" />
    </div>
    {isTablet?<div className="break-large"></div>:null}
    {isMobile?<>
    <div className="break-xl"></div></>:null}
    <div id="news-content-small">{content}</div>
    </>:null}
    </main>
        </div>
    )
}