import backgroundAdmin from "../Images/Live-Wide.jpg";
import { useMediaQuery } from "react-responsive";
import Login from "./Login";

// Admin portal page for managing website
export default function Admin(){

    // useMediaQueries for responsivness 
    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1024px)" });
    const isLaptop = useMediaQuery({ query: "(max-width: 1023px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 651px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 650px)" });
 

  const content = 
  <div id="contact-content">
  
  {/*We display the login button/form until the admin is logged in*/}
  {isLaptop?<div className="break-large"></div>:null}
  <Login/>
  </div>;

    return (
        <>
        {isDesktopOrLaptop ? (
          <>
            <div id="background-contact">
              <img id="contact-image" src={backgroundAdmin} alt="" />
            </div>
            </>
        ) : null}
        {isLaptop ? (
          <>
            <div id="background-contact-small">
              <img id="contact-image" src={backgroundAdmin} alt="" />
            </div>
            {isTablet ? <div className="break"></div> : null}
            {isMobile ? <div className="break-xl" /> : null}
            </>
        ) : null}
            {content}
            <div className="break-small" /><div className="break-small" />          
      </>
        
    )
}