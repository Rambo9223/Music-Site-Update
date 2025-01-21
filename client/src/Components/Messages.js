import { Nav, Navbar } from "react-bootstrap"
import { Trash,InboxFill,EnvelopeOpenFill,EnvelopeFill,EnvelopeXFill,BoxArrowLeft } from "react-bootstrap-icons"
import { useState,useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import FindMessagesAdmin from "./Backend-Async/FindMessagesAdmin";
import EditEnquiryAdmin from "./Backend-Async/EditEnquiryAdmin";
import PopUp from "./PopUp";
import DeleteEnquiryAdmin from "./Backend-Async/DeleteEnquiryAdmin";
import MessageReply from "./MessageReply";
import MessageNew from "./MessageNew";
import MultiLine from "./MultiLine";

export default function Messages(props){

    //bug with changing the screen size for rerendering message, fixed by changing multiline function

    let token = props.token;// auth tokem
    let initialPopUp = {
        message:"",
        type:"",
        response:""
      };
    const [messages,setMessages] = useState(null);// inbox array 
    const [message,setMessage] = useState(null); // selected message 
    const [filter,setFilter] = useState({"inbox":"","trash":""});// trash/inbox filter
    const [search,setSearch] = useState({});//object for search queries
    const [view,setView] = useState(false);// boolean value for if on mobile viewport viewing message
    const [popup,setPopUp] = useState(initialPopUp)// popup 
    const [bool,setBool] = useState(false);// bool to toggle popup 
    const [body,setBody] = useState([]);// message displayed in the main section
    const ToggleBool = () => {setBool(!bool);
    if(bool===true){setPopUp(initialPopUp);}};// toggle bool

    // responsivenss queries
    const isMobile = useMediaQuery({query:'(max-width:599px)'})
    const isTablet = useMediaQuery({ query: '(max-width: 1094px)'})
    const isCustom = useMediaQuery({query:"(max-width:850px)"})
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1094px)'})

    // on load useEffect hook retrieves messges from server
    useEffect(()=>{
        // get messages and filter based on if the user wants 
        // to look in inbox or trash folder
        FindMessagesAdmin({},token).then((res)=>{
            if(res.ok===true&&search!=="trash"){
                setFilter({inbox:res.results.filter((item)=>item.trash===false),trash:res.results.filter((item)=>item.trash===true)})
                setMessages(res.results.filter((item)=>item.trash===false));
            }else if(search==="trash"){
                setFilter({inbox:res.results.filter((item)=>item.trash===false),trash:res.results.filter((item)=>item.trash===true)})
                setMessages(res.results.filter((item)=>item.trash===true));
            }
            else{// error with retrieval
                setBool(true);
                setPopUp({message:res.message,type:"Server Response",response:"text-danger"})
            }
        })
    },[search,token]);

    /* The folders selectors on the left hand side of laptop or top of mobile view */
    function Folders(){
        let bool = Boolean(isCustom===true&&!isMobile);// bool determines screen size
        return (
            <><Nav.Link onClick={()=>{// link for inbox folder 
                if(filter.inbox.length>0){
                    // change this to be an less than 0 particulat or just change the messages
                    setBody(MultiLine(filter.inbox[0].enquiry));
                    setMessages(filter.inbox);
                    setMessage((filter.inbox[0]!==undefined)?filter.inbox[0]:null)
                }else{
                    setMessages([]);
                    setMessage(null);
                }
                }
                }><InboxFill/>  {bool?null:<>Inbox </>}- <span>{(messages!==null)?filter.inbox.length:null}</span></Nav.Link>
        <br/>
        <Nav.Link onClick={()=>{// link for the trash folder
        if(filter.trash.length>0){
            // change this to be an less than 0 particulat or just change the messages
            setBody(MultiLine(filter.trash[0].enquiry));
            setMessages(filter.trash);
            setMessage((filter.trash[0]!==undefined)?filter.trash[0]:null)
        }else{
            setMessages([]);
            setMessage(null);
        }
        }}><Trash/>  {bool?null:<>Trash  </>}- <span>{(messages!==null)?filter.trash.length:null}</span></Nav.Link></>
        )
    }
    /* sidebar is the container for the folder selectors and 
    create new message link*/
    function SideBar(props){
        let type = props.className;// type of viewport 
        let compose = props.compose// class name given for css changes
        let bool = Boolean(isCustom===true&&!isMobile);
    return(
    <Navbar className={type}>
    <Nav.Item id={compose}>
    <MessageNew bool={bool}/>
    </Nav.Item>
    <br/>
    {/* if on the mobile viewport when we select a message just the messsage is 
    diplayed with the option to compose or go back to all messages*/}
    {(isMobile===true)?(view===false)?<Folders/>:null:<Folders/>}
    <br/>
    {(isMobile===true&&view===true)?<Nav.Link onClick={()=>{setView(false);setMessage(null)}}><BoxArrowLeft/> Back</Nav.Link>:null} 
    </Navbar>)
    }

    /* Function for mapping and displaying message thumnails */
    function Thumbs(props){
        return(
    <div className={`message-thumbs`} style={props.style}>
    {(isMobile===true||isTablet===true)?<div className="sticky"><SideBar className="messages-topbar" compose={"compose-top"}/></div>:null}
    {(messages!==null)?messages.map((item)=>{
        let date = new Date(item.date);
        let dateTime = date.toISOString().slice(0,10);
        return <div onClick={()=>{
        setMessage(item);
        setBody(MultiLine(item.enquiry));
        setView(true);
        item.read = true;
        EditEnquiryAdmin(item,token);
        }} className="message-thumb" key={item._id}>
            <div className="thumb">
                {/*max amount of characters */}
            <p>{item.subject} - <span>{(item.read===false)?<EnvelopeFill/>:<EnvelopeOpenFill/>}</span></p>
            <p>{item.email} <span></span></p>
            <p>{dateTime}</p>
            </div>
        </div>
    }):null}
    {(messages!==null&&messages.length===0)?<p>Folder is empty. <EnvelopeXFill/></p>:null}
    </div>
        )
    }

    /* Main message screen when a message is selected */
    function MainScreen(props){
        return(
    <div className={`messages`} style={props.style}>
    {/* if on mobile view the side bar is relocated to the top of the main screen */}
    {(isMobile===true)?<div className="sticky"><SideBar className="messages-topbar" compose={"compose-top"}/></div>:null}
    <div className="message-header">
        <p className="header">{(message!==null)?<>Subject: {message.subject}</>:null}<span className="header-span">{(message!==null)?<>Date: {new Date(message.date).toISOString().slice(0,10)}</>:null}</span></p>
        <p className="header">{(message!==null)?<>Sender: {message.name}</>:null}<span id="trash" className="header-span" onClick={()=>{
            if(message.trash===true){
            DeleteEnquiryAdmin(message._id,token).then((res)=>{
                if(res.ok===true){
                setSearch("trash");
                setBody([]);
                setMessage({enquiry:"message deleted.",name:"",date:new Date().toISOString(),subject:""});
                }else{
                setBool(true);
                setPopUp({message:res.message,type:"Server Response",response:"text-danger"});
                }
            })
            }else{
            message.trash = true;
            EditEnquiryAdmin(message,token).then((res)=>{
                if(res.ok===true){
                setSearch({});
                setBody([]);
                setMessage({enquiry:"message sent to trash.",name:"",date:new Date().toISOString(),subject:""});
                }else{
                    setBool(true);
                    setPopUp({message:res.message,type:"Server Response",response:"text-danger"});
                }
            })
            }
        }}>{(message!==null)?(message.trash===true)?<><Trash/> Delete</>:<><Trash/> Trash</>:null}
        </span>
        <span style={{"paddingRight":"4%"}}/>
        {(message!==null)?(message.trash!==true)?
        <MessageReply message={message}/>:null:null}
        </p>
    </div>
    <br/>
    
    <div className="message-body">
        {(message!==null)?body.map((line)=>{
            let key = Math.floor((Math.random()*1000) * Number(body.indexOf(line)+1));
            return <p key={key}>{line}</p>
        }):null}
    </div>
</div>
        )
    }

    return <>
    <h3 className="faded-title">Messages</h3>
    <br/>
    <div className="messages-background">
        {isDesktopOrLaptop?<><SideBar className={"messages-sidebar"} compose={"compose"}/><Thumbs style={{"width":"25%"}}/><MainScreen style={{"width":"50%"}}/></>:null}
        {(isTablet&&!isMobile)?<><Thumbs style={{"width":"40%"}} />:<MainScreen style={{"width":"60%"}} /></>:null}
        {(isMobile===true)?(view===false)?<Thumbs style={{"width":"100%"}} />:<MainScreen style={{"width":"100%"}}/>:null}
        {(isMobile===false)?<></>:null}
        
    </div>
    {(bool===true&&popup.message!=="")?<PopUp message={popup.message} type={popup.type} response={popup.response} bool={bool} ToggleBool={ToggleBool}/>:null}
    </>
}