import { useState,useEffect } from "react"
import { Button,Card,ListGroup } from "react-bootstrap";
import FindMediaAdmin from "./Backend-Async/FindMediaAdmin";
import DeleteMedia from "./Backend-Async/DeleteMedia";
import EditPageMedia from "./EditPageMedia";
import Logo from "../Images/Logo.png";
import PopUp from "./PopUp";
import {Trash,Folder2Open,PlusCircle,QuestionCircle } from "react-bootstrap-icons";
import AddPageMedia from "./AddPageMedia";

// page displaying page media for admins to view
export default function PageMedia(props){

    let token = props.token;// auth token 
    let initialPopUp = {// popup
      message:"",
      type:"",
      response:""
    }

    const [media,setMedia] = useState([]);// array for media object 
    const [filter,setFilter] = useState(null);// search filter
    const [edit,setEdit] = useState(null);// contains item details for user edit 
    const [newMedia,setNewMedia] = useState(false);// opens add page media form
    const [popup,setPopUp] = useState(initialPopUp)// popup 
    const [bool,setBool] = useState(false);// bool to toggle popup 
    const ToggleBool = () => {setBool(!bool);
    if(bool===true){setPopUp(initialPopUp);setEdit(null)};setNewMedia(false)};
    
    // retrieve media object , depending on filter supplied 
    useEffect(()=>{
      if(filter!==null){
      FindMediaAdmin(filter,token).then((res)=>{
        if(res.ok===true){
          setMedia(res.results);// on success set results to setMedia hook 
        }else{
          // reset filter and bring up popup with error message 
          setBool(true);
          setPopUp({message:res.message,type:"Server Response",response:"text-danger"})
          setFilter(null);
        }
      })}
    },);

    // function to retrieve filter information from page
    function HandleFilter(){
      if(document.getElementById("filters").value===""){// no filter
        setFilter({query:"",
        filter:""});
      }else{
      setFilter({query:"media",// set to supplied filter 
      filter:document.getElementById("filters").value});
      }
    }

    // on edit open form and add details to fields
    function HandleEdit(item){
      setBool(true);
      setEdit(item);
    }

    return (
    <>
    <h3 className="faded-title">Page Media</h3>
    <div>
    <Button variant="success" style={{"marginTop":"0.5%"}} onClick={()=>{ToggleBool(); setNewMedia(true)}} >Add Media <PlusCircle/></Button>
    
    <h4 className="faded-title">Show Media:</h4>
    <select  className="form-select-md" id="filters" aria-label="Default select example">
    <option defaultValue={""}>Filter by:</option>
    <option value={""}>All</option>
    <option value="image">Images</option>
    <option value="video">Video</option>
    <option value="logo">Social Media</option>
</select>
<br/> 
<Button style={{marginTop:"0.5%"}} onClick={()=>{HandleFilter()}} type="button" className="btn btn-primary">
  Search <QuestionCircle/>{/*<Search/>*/}
</Button>
  </div>
  {media.length>0?<h4 className="faded-title">{media.length} result{(media.length>1)?<>s</>:null} found:</h4>:null}
  <div className="gallery">
    {media.length>0?media.map((item)=>{
      let mediaPreview; 
      if(item.media==="logo"){
      mediaPreview = <img className="external-link-img" src={item.path} height={"60"} width={"60"} alt={`${item.title}`}/>
      }else if(item.media==="image"){
      mediaPreview = <img className="external-link-img" src={item.path} height={"150"} width={"150"} alt={`${item.title}`}/>}
      else if(item.media==="video"){
        mediaPreview=<iframe width="200" height="200" src={item.path} title={item.title} 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
      }
      return (
      <>
<Card border="info" style={{width:"20rem",marginTop:"5%"}} key={item.id}>
<div>
<Card.Header>
<img height={"100px"} width={"100px"} src={Logo}  alt="logo"/>
</Card.Header>
</div>
<Card.Body>
<Card.Title><strong>Title: </strong>{item.title}</Card.Title>

<ListGroup className="list-group-flush" key={item.id}>
<li className="list-group-item"><strong>Media: </strong>{item.media}</li>
<li className="list-group-item"><strong>Preview: </strong><span className="line-up">{mediaPreview}</span></li>
<li className="list-group-item"><strong>Path: </strong>{item.path}</li>
<li className="list-group-item"><strong>Id: </strong>{item.id}</li>
{item.link?<Card.Link href={item.link} className="list-group-item"><strong>Link: </strong>{item.link}</Card.Link>:null}
</ListGroup>
</Card.Body>
<Card.Footer className="action-container">
<Button variant="danger" onClick={()=>{DeleteMedia(item.id,token).then((res)=>{
  // if user wants to delete on click, media item info passed to server 
  if(res.ok===true){// if deleted 
    // alert success
    setBool(true);
    setPopUp({message:res.message,type:"Server Response",response:"text-primary"})
  }else{// if error 
    // alert error
    setBool(true);
    setPopUp({message:res.message,type:"Server Response",response:"text-danger"})
  }
})}}>Delete <Trash/></Button> 
<Button variant="warning" onClick={()=>{HandleEdit(item)}}>Edit <Folder2Open/></Button>
</Card.Footer>
</Card>
<br/>
</>
    )}):null}
{(bool===true&&newMedia===true)?<AddPageMedia token={token} bool={bool} ToggleBool={ToggleBool}/>:null}
{(bool===true&&popup.message!=="")?<PopUp message={popup.message} type={popup.type} response={popup.response} bool={bool} ToggleBool={ToggleBool}/>:null}
{(bool===true&&edit!==null)?<EditPageMedia item={edit} token={token} bool={bool} ToggleBool={ToggleBool}/>:null}

  </div>
    </>)
    
}

/*{"media":"video","path":"https://www.youtube.com/embed/kOSM9SYhAoU","title":"Hold Back The River Cover (Midnight Pacific)","id":77} */