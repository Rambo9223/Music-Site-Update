/* The NavBar component displays the nav bar and 
contains the routes for the main page body */
import React from "react";
import { Route,Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Layout from "./Layout";
import Home from "./Home";
import News from "./News";
import Media from "./Media";
import Contact from "./Contact";
import Logo from "../Images/Logo.png";
import UnSubscribe from "./Unsubscribe";
import Admin from "./Admin";

function NavBar(){

     /* the two variables use the useMediaQuery hook to set the 
    width limits, thus the variable is a boolean variable*/
    const isMobile = useMediaQuery({query:'(max-width:599px)'})
    const isCustom = useMediaQuery({query:"(min-width:742px)"})
    const isTablet = useMediaQuery({ query: '(max-width: 1023px)'})
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1024px)'})

    /* Depending on the viewing device we change the page layout with 
    useMediaQuery and display the layout JSX component, this is the 
    NavBars links, underneath in the body div we display the page routes */
    return (<div className="page">
        <div className="nav-bar">
    {(isDesktopOrLaptop===true)?
   <>
   <img className="logo-nav" src={Logo} alt="Logo-White"/>
    <Layout/>
    <img className="logo-nav" src={Logo} alt="Logo-White"/></>:null}
    {(isTablet===true&&isMobile===false)?<>
    <img id="logo-right" className="logo-nav" src={Logo} alt="Logo-White"/>
    <div id="nav-small"><Layout/></div>
    {(isCustom===true)?<img id="logo-right" className="logo-nav" src={Logo} alt="Logo-White"/>:null}
    </>:null}
    {(isMobile===true&&isTablet===true)?<>
    <div id="nav-small"><Layout/></div>
    </>:null}
    </div>
        {(isMobile===true&&isTablet===true)?<div className="break-large"/>:null}
        <div className='body'>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="news" element={<News/>} />
        <Route path="media" element={<Media/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="unsubscribe" element={<UnSubscribe/>}/>
        <Route path="admin" element={<Admin/>}/>
        </Routes> 
        <br></br>
        </div>
    </div>
    )
}

export default NavBar
