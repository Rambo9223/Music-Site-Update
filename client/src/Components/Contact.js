import Links from "./Links";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import backgroundContact from "../Images/Live-Wide.jpg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import NewEnquiry from "./Backend-Async/NewEnquiry";
import PopUp from "./PopUp";
import MultiLine from "./MultiLine";

// The contact page allows users to submit a enquiry from contact form & displays links 
export default function Contact() {
  const [success, SetSuccess] = useState("");// success green text
  const [err,setErr] = useState("");// error red text

  // media queries for responsiveness
  const isLaptop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 651px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 650px)" });


  const [bool,setBool] = useState(false);// bool to toggle popup
  const [popUp,setPopUp] = useState({// popup info object 
    message:"",
    type:"",
    response:""
  })

  //react hook form initialisation 
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // toggle bool for popup
  function ToggleBool(){setBool(!bool);}

  // when form is submitted with data object 
  const onSubmit = (data) => {
    // send to server then 
    NewEnquiry(data).then((res)=>{
      if(res.ok===true){// if accepted
      //console.log(res);
      setBool(true);// load pop up
      setPopUp({// set pop up message
        message:MultiLine(`${res.message}.
        You should recieve a confirmation shortly.`),
        type:"Enquiry",
        response:"text-success"
      })
      SetSuccess(
        res.message
      );
      reset();// reset form
      }else{// not accepted 
        SetSuccess("");
        setErr(`Error. ${res.message}`);// display error message
      }
    });
    //console.log(data);
  };
  // page content
  let content = (
    <div id="contact-content">
      <h2 className="faded-title">
        Get in touch on{" "}
        <span className="on-page-link">
          <a href="#socials">-Social Media-</a>
        </span>
        <div className="break-small" />
        Or the below contact form.
      </h2>
      <div className="break-small"></div>
      <h2 className="faded-title">Contact Me:</h2>
      <div className="break-small" />
      <div id="contact-form-container">
        <form className="new-item-form" onSubmit={handleSubmit(onSubmit)}>
          {success && <p className="success-msg">{success}</p>}
          {err && <p className="errorMsg">{err}</p>}
          <label className="form-labels">Your Name:</label>
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
          <br />

          <label className="form-labels">Email Address:</label>
          <br />
          <input
            className="form-inputs"
            type="text"
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
          <br />
          <label className="form-labels">Contact Number:</label>
          <br></br>
          {/*Play with phone input in hook form
    want user to supply either email or phone */}
          <Controller
            name="number"
            control={control}
            rules={{}}
            render={({ field: { onChange, value, name } }) => (
              <PhoneInput
                className="form-inputs"
                name={name}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <label className="form-labels">Subject:</label>
          <input
            className="form-inputs"
            type="text"
            placeholder="Message Subject."
            name="subject"
            {...register("subject", {
              required: "Subject is required.",
            })}
          />
          {errors.subject && <p className="errorMsg">{errors.subject.message}</p>}
          <br />

          <label className="form-labels">Enquiry Details:</label>
          <textarea
            className="form-inputs"
            rows={"4"}
            cols={"50"}
            placeholder="Please type your enquiry here."
            {...register("enquiry", {
              required: "Enquiry is required",
              maxLength: {
                value: 400,
                message: "Your enquiry cannot exceed 400 characters.",
              },
              minLength: {
                value: 30,
                message: "Your enquiry cannot be less than 30 characters.",
              },
            })}
          />
          {errors.enquiry && (
            <p className="errorMsg">{errors.enquiry.message}</p>
          )}
          <br />
          <input
          className="form-inputs-hidden"
          {...register("date",{
            value:new Date().toISOString()
          })}
          />
          <input
          className="form-inputs-hidden"
          {...register("read",{
            value:false
          })}/>
          <input
          className="form-inputs-hidden"
          {...register("trash",{
            value:false
          })}/>
          <input
          className="form-inputs-hidden"
          {...register("answered",{
            value:false
          })}/>

          <Button variant="primary" type="submit">
            Send
          </Button>
        </form>
        <div id="socials" />
      </div>
      {bool===true?<PopUp message={popUp.message} type={popUp.type} response={popUp.response} bool={bool} ToggleBool={ToggleBool} />:null}
    </div>
  );
  // return form content in the different media queries 
  return (
    <>
      {(isLaptop===true) ? (
        <>
          <div id="background-contact">
            <img id="contact-image" src={backgroundContact} alt="" />
          </div>
          {content}
          <div className="break-small" />
          <div className="break-small" />

          <Links />
        </>
      ) : null}
      {(isTabletOrMobile===true)? (
        <>
          <div id="background-contact-small">
            <img id="contact-image" src={backgroundContact} alt="" />
          </div>
          {isTablet ? <div className="break"></div> : null}
          {isMobile ? <div className="break-xl" /> : null}
          {content}
          <Links />
        </>
      ) : null}
    </>
  );
}
