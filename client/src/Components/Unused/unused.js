{/*


function CountrySelector() {
      const options = useMemo(() => countryList().getData(), [])
      

      const changeHandler = (country) => {
        setCountry(country)
      }
    
      return <Select options={options} value={country} onChange={changeHandler}/>
    }


let initialPref = {
      New_Releases:true,
      Shows_Near_Me:true,
    }
    
    const nameRef = useRef(null);
    const [age,setAge] = useState("");
    const [email,setEmail] = useState("");
    const [city,setCity] = useState("");


<div id="contact-form-container">
    <form  className="new-item-form">
    <label className="form-labels">Your Name:</label>
    <input className="form-inputs" type="text"
    name="name"
    id="subscriber-name"
    placeholder="Your Name"
    ref={nameRef}
    //onChange={(e)=>{setName(e.target.value)}}
    />
    <br/>
  
    <label class="form-labels">Age:</label>
    <input className="form-inputs" type="text" 
    id="subscriber-age"
    placeholder="Age" 
    pattern="[0-9]{2,3}"
    value={age}
    onChange={(e)=>{setAge(e.target.value)}}  
    /><br/>

    <label className="form-labels">Email Address:</label>
    <br/>
    <input className="form-inputs" type="email"
    id="subscriber-email"
    value={email}
    placeholder="Your Email Address"
    onChange={(e)=>{setEmail(e.target.value)}}/><br/>

    <label class="form-labels">City:</label>
    <input className="form-inputs" type="text" 
    id="subscriber-city"
    placeholder="Your City" 
    value={city}
    onChange={(e)=>{setCity(e.target.value)}}  
    /><br/>

    <label class="form-labels">Country:</label>
    <CountrySelector/>
    <br/>
    
    
    <div class="checkbox-group">
    <label class="form-labels">Notify me of:</label>
    <div className="break-small"/>

    <FormCheck 
    inline
    label="New Releases"
    name="group1"
    id={`subscribe-release`}
    checked={preferences.New_Releases}
    onChange={(e)=>{setPreferences({
      New_Releases:e.target.checked,
      Shows_Near_Me:preferences.Shows_Near_Me
    });}}
    />

    <FormCheck 
    inline
    label="Shows in my area"
    name="group1"
    id={`subscribe-show`}
    checked={preferences.Shows_Near_Me}
    onChange={(e)=>{setPreferences({
      New_Releases:preferences.New_Releases,
      Shows_Near_Me:e.target.checked
    });}}
    />
    </div>

    <div className="break"/>
    
    {onClick={HandleSubmit}}

        <Button variant="primary"  type="button"
        onClick={Submit}>
        
          Subscribe
        </Button>
      </form>
      </div>
  
  
Initial Form for contact page 

       let content = <div id="contact-content">
    <h2 className="faded-title">Get in touch on <span className="on-page-link"><a href="#socials">-Social Media-</a></span><div className="break-small"/>
    Or the below contact form.</h2>
    <div className="break-small"></div>
    <h2 className="faded-title">Contact Me:</h2>
    <div className="break-small"/>
    {submitted === false ? (
    <div id="contact-form-container">
    <form className="new-item-form">
    <label className="form-labels">Your Name:</label>
    <input className="form-inputs" type="text"
    id="form-user"
    value={contactName}
    placeholder="Your Name"
    onChange={(e)=>{setContactName(e.target.value)}}/><br/>
    <label className="form-labels">Email Address:</label>
    <br/>
    <input className="form-inputs" type="email"
    id="form-email"
    value={contactEmail}
    placeholder="Your Email Address"
    onChange={(e)=>{setContactEmail(e.target.value)}}/><br/>
    <label className="form-labels">Contact Number:</label><br></br>
    <PhoneInput 
    className="form-inputs"
    value={contactNumber}
    onChange={setContactNumber}
    />
    <br/>
    <label className="form-labels">Enquiry Details:</label>
    <textarea className="form-inputs" rows={"4"}
    cols={"50"}
    id="form-enquiry"
    value={enquiry}
    placeholder="Please type your enquiry here."
    onChange={(e)=>{setEnquiry(e.target.value)}}/><br/>

        <Button variant="primary" onClick={HandleSubmit} type="button">
          Send
        </Button>
      </form>
      <div id="socials"/>
      </div>
      
    ) : (
      <>
        <h2>Enquiry Sent</h2>
        <h3>You should recieve a confirmation email/text soon.</h3>
      </>
    )}
    
    function HandleSubmit (){
        setSubmitted(!submitted);
        // add back end functionality to send data! 
    }
    
    */}