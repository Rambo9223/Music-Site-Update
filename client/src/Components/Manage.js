// page to manage subscribers/messages and media as an admin
import { useState } from "react";
import Subscribers from "./Subscribers";
import PageMedia from "./PageMedia";
import Messages from "./Messages";

/* Page to display the links for admin pages */

function Manage(props){
    // the authourisation token
    let token = props.token; 

    // object to display the different pages
    const [displayPage,setDisplayPage] = useState({
        subscribers:false,
        pageMedia:false,
        messages:false
    });
    /* User clicks a li item and it will change the bool values in the 
    display page object which changes the page displayed */
    return (<div className="manage-sticky">
        <ul className="manage">
            <li onClick={()=>{setDisplayPage({subscribers:true,pageMedia:false,messages:false})}}>Subscribers</li>
            <li onClick={()=>{setDisplayPage({subscribers:false,pageMedia:true,messages:false})}}>Page Media</li>
            <li onClick={()=>{setDisplayPage({subscribers:false,pageMedia:false,messages:true})}}>Messages</li>
        </ul>
        {displayPage.subscribers===true?<Subscribers token={token}/>:null}
        {displayPage.pageMedia===true?<PageMedia token={token}/>:null}
        {displayPage.messages===true?<Messages token={token}/>:null}
    </div>)

}
export default Manage