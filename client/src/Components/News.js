// page for any news and mailing list subscription. 
import newsBackground from "../Images/CC2A0054.png";
import comingSoon from "../Images/Gallery/coming-soon.jpg"
import { useState,useMemo } from "react";
import {Form,Button} from "react-bootstrap";
import Select from "react-select"
import countryList from "react-select-country-list";
import { useForm, Controller } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import NewSubscriber from "./Backend-Async/NewSubscriber";
import PopUp from "./PopUp";


export default function News(){
  // media queries for different screen sizes
  const isLaptop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 651px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 650px)" });
  const [success, SetSuccess] = useState("");//success message 
  const [err,setErr] = useState("");//error message
  const [age, setAge] = useState(16);//form age
  // subscriber preferences
  const [preferences, setPreferences] = useState({ shows: false, releases: true });
  const [bool,setBool] = useState(false);
  const [popUp,setPopUp] = useState({
    message:"",
    type:"",
    response:""
  })
  // hook form initialisation
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      preferences
    },
  });
  // retrieve country list for the form
  const options = useMemo(() => countryList().getData(), []);


  // function to change preferences on forms
  function HandlePref(releases, shows) {
    setPreferences({
      shows: shows,
      releases: releases,
    });
  }

  function ToggleBool(){setBool(!bool);}

  // function form submit
  const onSubmit = (data) => {
    // call new sub async function
    NewSubscriber(data).then((res)=>{
      // if response is good
      if(res.ok === true){
        // log success message on form and reset form
        SetSuccess(res.message);
        setBool(true);
        setPopUp({
          message:res.message,
          type:"Subscriber",
          response:"text-success"
        })
        reset();
      }else if(res.status===409){
        // if there is a duplicate subscriber
        setErr(res.message)// log error
        SetSuccess("");// remove success message
      }else{
        // any other error 
        setErr(res.message)
      }
    });
  };

  
  // page content 
  const content = 
  <>
  
  <div className="image-wrap-news">
  <h1 className="faded">Coming Soon!</h1>
  <h3 className="faded">New Album!, Announcement 1st June!</h3>
  <img className="gallery-image" src={comingSoon} alt="coming-soon"/>
  <figcaption className="faded">News will be realeased on all social platforms <br/> midnight June 1st 2025 BST</figcaption>  
  </div>
  {/*Subscription Form*/}
  {isTabletOrMobile?<div className="break-large"></div>:null}
  <div id = "news-form-container">
      <section className="subscription">
        <h2 className="faded">Subscribe to stay up to date!</h2>
        <form className="new-item-form" onSubmit={handleSubmit(onSubmit)}>
      {success && <p className="success-msg">{success}</p>}
      {err && <p className="errorMsg">{err}</p>}
        <div className="form-control">
        <label className="form-labels">Name</label><br/>
        <input
          className="form-inputs"
          type="text"
          placeholder="Enter your name."
          name="name"
          {...register("name", {
            required: "Name is required.",
          })}
        />
        {errors.name && <p className="errorMsg">{errors.name.message}</p>}
      </div>
      <div className="form-control">
        <label className="form-labels">Email</label><br/>
        <input
        className="form-inputs"
          type="text"
          name="email"
          placeholder="Enter your email."
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
        />
        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
      </div>
      <div className="form-control">
        <label className="form-labels">
          Age: <span id="age-select">{age}</span>
        </label>
        <input
          className="form-inputs"
          type="range"
          placeholder="Enter your Age."
          name="age"
          {...register("age", {
            required: "Age is required.",
            max: 100,
            min: {
              value: 16,
              message: "You must be at least 16 years old to subscribe.",
            },
          })}
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        {errors.age && <p className="errorMsg">{errors.age.message}</p>}
      </div>

      <div className="form-control">
        <label className="form-labels">City</label><br/>
        <input
        className="form-inputs"
          type="text"
          placeholder="Enter your City."
          name="city"
          {...register("city", {
            required: preferences.shows,
          })}
        />
        {errors.city && (
          <p className="errorMsg">
            City is required if shows near me is checked.
          </p>
        )}
      </div>

      <div className="form-control">
        <label className="form-labels">Country</label><br/>
        <Controller
          name="countries"
          control={control}
          rules={{ required: "Country selection is required" }}
          render={({ field:{onChange,name,value} }) => (
            <Select value={value} name={name} options={options} onChange={onChange} />
          )}
        />
        {errors.countries && (
          <p className="errorMsg">{errors.countries.message}</p>
        )}
      </div>

 

      <div className="form-control">
      <label className="form-labels">Notify me of:</label>
      <div className="break-small"/>

        <Form.Check
          type="checkbox"
          label="Shows in my area"
          value={preferences.shows}
          {...register("preferences.shows", {
            onChange: (e) => {
              HandlePref(preferences.releases, e.target.checked);
            },
          })}
        />
        <Form.Check
          type="checkbox"
          label="New Releases"
          value={preferences.releases}
          {...register("preferences.releases", {
            onChange: (e) => {
              HandlePref(e.target.checked, preferences.shows);
            },
          })}
        />
      </div>

      <div className="form-control">
        <Button variant="primary" type="submit">Subscribe</Button>
      </div>
    </form>
      </section>
      {bool===true?<PopUp message={popUp.message} type={popUp.type} response={popUp.response} bool={bool} ToggleBool={ToggleBool} />:null}
      </div> 
   
  </>;
    
    // content layout with screen queries 
    return (
        <div>
        <main id="news">
      {isLaptop?<>{/*Background Image*/}
      <div id="background-news">
        <img id="news-image" src={newsBackground} alt="" />
    </div>
    <div id="news-content-large">{content}</div>
    </>:null}
      
      {isTabletOrMobile?<><div id="background-news-small">
        <img id="news-image" src={newsBackground} alt="" />
    </div>
    {isTablet?<div className="break-xl"></div>:null}
    {isMobile?<><div className="break-xl"></div>
    <div className="break-xl"></div></>:null}
    <div id="news-content-small">{content}</div>
    </>:null}

    </main>
        </div>
    )
}