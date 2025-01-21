import { useState,useEffect,useMemo } from "react"
import { Button,Card,ListGroup,FormCheck } from "react-bootstrap";
import Logo from "../Images/Logo.png";
import PopUp from "./PopUp";
import {Trash,QuestionCircle } from "react-bootstrap-icons";
import Select from "react-select"
import countryList from "react-select-country-list";
import FindSubscriberAdmin from "./Backend-Async/FindSubscriberAdmin";
import DeleteSubscriber from "./Backend-Async/DeleteSubscriber";
let initial = {shows:false,releases:false}

/* Page for admin to manage subscribers */
export default function Subscribers(props){

    let token = props.token;// auth token 
    let initialPopUp = {// popup
      message:"",
      type:"",
      response:""
    }
    const [preferences,setPreferences] = useState(initial);// subscriber pref
    const [searchBool,setSearchBool] = useState(null);// field user is searching
    const [media,setMedia] = useState([]);// array for server object 
    const [filter,setFilter] = useState(null);// filter to send to server
    const [popup,setPopUp] = useState(initialPopUp)// popup
    const [bool,setBool] = useState(false);// bool to toggle popup 
    const [search,setSearch] = useState("")// text input for a search field
    const ToggleBool = () => {setBool(!bool);// function to change bool
    if(bool===true){setPopUp(initialPopUp);}};
    
    // country list used in the form select 
    const options = useMemo(() => countryList().getData(), []);

    // useEffect hook retrieves the items from the server when the filter is changed
    useEffect(()=>{
      if(filter!==null){
      FindSubscriberAdmin(filter,token).then((res)=>{
        if(res.ok===true){// if server returns object 
          setMedia(res.results);// set object to setMedia hook 
        }else{
          // else if failure, alert user with popup and error message
          setBool(true);
          setPopUp({message:res.message,type:"Server Response",response:"text-danger"});
          setFilter(null);// reset filter
        }
      })}
    },);

    // function to change the filter based on user search
    function HandleFilter(){
      if(searchBool==="all"){
        setFilter({query:"",
        filter:""});
      }else if(searchBool==="country"){
        setFilter({query:"country",filter:search.label})
      }
      else if(searchBool==="preferences"){
        setFilter({query:"preferences",filter:preferences})
      }
      else{
      setFilter({query:searchBool,
      filter:search});
      }

    }

    return (
    <>
    <h3 className="faded-title">Subscribers</h3>
    <div>
    <select onChange={(e)=>{setSearchBool(e.target.value);// select element allows users to filter backend 
        setSearch("")}} className="form-select-md" id="filters" aria-label="Default select example">
    <option defaultValue={""}>Filter by:</option>
    <option value={"all"}>All</option>
    <option value="name">Name</option>
    <option value="email">Email</option>
    <option value="city">City</option>
    <option value="country">Country</option>
    <option value="preferences">Preferences</option>
</select>
<br/>
<Button style={{marginTop:"0.5%"}} onClick={()=>{HandleFilter()}/*on click the filter is set with
the handle filter function */} type="button" className="btn btn-primary">
  Search <QuestionCircle/>
</Button>
<div className="break-small"/>
<div className="new-item-form-hidden">
{//if user is searching name, email or city text input is shown
(searchBool==="name"||searchBool==="email"||searchBool==="city")?<div className="form-control"><label className="form-labels">Search {searchBool}:<input value={search} className="form-inputs" type="text" onChange={(e)=>{setSearch(e.target.value)}}/></label></div>:null}

{// if country is the search field the country dropdown is displayed
(searchBool === "country")?<div className="form-control">
    <label className="form-labels">Country:</label><br/>
    <Select className="form-inputs" options={options} onChange={setSearch} />
    </div>:null}

{// if preferences, two check forms are displayed
(searchBool === "preferences")?
<div className="form-control">
<div className="form-labels">
<FormCheck
          style={{"backgroundColor":"ButtonHighlight"}}
          type="checkbox"
          label="Shows"
          onChange={(e)=>{setPreferences({shows:e.target.checked,releases:preferences.releases})}}
          value={preferences.shows}
        />
        <FormCheck
          style={{"backgroundColor":"ButtonHighlight"}}
          type="checkbox"
          label="Releases"
          onChange={(e)=>{setPreferences({shows:preferences.shows,releases:e.target.checked})}}
          value={preferences.releases}
        />
        </div>
</div>:null}
</div>
  </div>
  {media.length>0?<h4 className="faded-title">{media.length} result{(media.length>1)?<>s</>:null} found:</h4>:null}
  <div className="gallery">
    {/*if result is returned it is mapped to bootstrap cards */}
    {media.length>0?media.map((item)=>{
      return (
      <>
<Card border="info" style={{width:"20rem",marginTop:"5%"}} key={item._id}>
<div>
<Card.Header>
<img height={"100px"} width={"100px"} src={Logo}  alt="logo"/>
</Card.Header>
</div>
<Card.Body>
<Card.Title><strong>Subscriber: </strong>{item.name}</Card.Title>

<ListGroup className="list-group-flush" key={item.id}>
<li className="list-group-item"><strong>email: </strong>{item.email}</li>
<li className="list-group-item"><strong>Age: </strong>{item.age}</li>
<li className="list-group-item"><strong>City: </strong>{item.city}</li>

{item.country?<li className="list-group-item"><strong>Country: </strong>{item.country}</li>:null}
<li className="list-group-item"><strong>Preferences: </strong><br/>
Shows: {String(item.preferences.shows)}<br/>
Releases: {String(item.preferences.releases)}</li>
<li className="list-group-item"><strong>Id: </strong>{item._id}</li>
</ListGroup>
</Card.Body>
<Card.Footer className="action-container">
<Button variant="danger" onClick={()=>{// user can delete any subsrciber 
  DeleteSubscriber(item._id,token).then((res)=>{// pass item to server 
  if(res.ok===true){// if sucess 
    // display popup with success message 
    setBool(true);
    setPopUp({message:res.message,type:"Server Response",response:"text-primary"})
  }else{// if fail
    // display popup with error
    setBool(true);
    setPopUp({message:res.message,type:"Server Response",response:"text-danger"})
  }
})}}>Delete <Trash/></Button> 
</Card.Footer>
</Card>
<br/>
</>
    )}):null}
{(bool===true&&popup.message!=="")?<PopUp message={popup.message} type={popup.type} response={popup.response} bool={bool} ToggleBool={ToggleBool}/>:null}
  </div>
    </>)

}