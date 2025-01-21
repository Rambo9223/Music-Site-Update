/* We will use the clock to give an auto timeout function
for when an admin logs in */
import { useState,useEffect } from "react";
import LogoutAdmin from "./Backend-Async/LogoutAdmin";
import AutoLogoutPopUp from "./AutoLogoutPopUp";

export default function Clock(props){
    let token = props.token;//the token to pass to logout
    
    //the local storage item for the clock if page is refreshed
    let stored = JSON.parse(localStorage.getItem("timer"));

    //when user logs in for the first time
    let initaliseClock = {
        "minutes":stored===null?30:stored.minutes,
        "seconds":stored===null?0:stored.seconds,
        "switchSeconds":stored===null?1800:stored.switchSeconds
   }
    
    //set usestate variables for the clock and useEffect functions
    const [minutes,setMinutes] = useState(initaliseClock.minutes);
    const [seconds,setSeconds] = useState(initaliseClock.seconds);
    const [switchSeconds,setSwitchSeconds] = useState(initaliseClock.switchSeconds);
    const [response,setResponse] = useState(null);
    const [bool,setBool] = useState();
    const [send,setSend] = useState({
        type:"",
        message:""
    });

    // ToggleBool reloads the page if case 1 and auto logout 
    function ToggleBool(){
        setBool(!bool);
        if(response!==null){
        if(response.ok===true){
            localStorage.clear();
            // reload to clear page
            window.location.reload();
        }
    }
    }

    // useEffect code for interval
    useEffect(() => {
        const interval = setInterval(() => {
            // set the timer object to the default value or remembered value  
            localStorage.setItem("timer",JSON.stringify({
                "minutes":minutes,
                "seconds":seconds,
                "switchSeconds":switchSeconds
            }));
            // switch case for the auto sign out alerts
            switch(switchSeconds){
                case 600:
                    setBool(true);
                    setSend({type:"Warning",
                    message:`For your saftety you will be auto logged out in 10 minutes.`})
                    break;
                case 300:
                    setBool(true);
                    setSend({type:"Warning",
                    message:`For your saftety you will be auto logged out in 5 minutes.`})
                    break;
                case 60:
                    setBool(true);
                    setSend({type:"Warning",
                    message:`For your saftety you will be auto logged out in 60 seconds.`})
                    break;
                case 1:// on case 1 we log out the user
                    LogoutAdmin(token).then((res)=>{
                        console.log(res);
                        setResponse(res);
                        if(res.ok === true){
                            setBool(true);
                            setSend({type:"Expired",
                            message:`For your saftety you have been auto logged out.`})
                        }else{
                            //console.log(res);
                            setSend({
                                type:"Error",
                                message:`Status - ${res.status}. ${res.message}`
                            })
                        }
                    })
                    clearInterval(interval)//end the interval
                    break;
                case -10:// if error & the timer continues we remove it from local storage
                    localStorage.clear();
                    break;
                default:
            }
            // remove 1 from seconds if greater than 0
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            // if seconds 0 & minutes is not -1 minute and set seconds to 59
            if (seconds === 0 && minutes!== 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
            } 
            // always remove 1 from switch seconds
            setSwitchSeconds(switchSeconds-1);
        }, 1000);
        return () => clearInterval(interval);
    
    },)
    // return clock to nav bar
    return (<>
    <div>{`${minutes}:${(seconds<10)?"0":""}${seconds}`}</div>
    {(bool===true)?<div data-testid="popup"><AutoLogoutPopUp type={send.type} message={send.message} bool={bool} ToggleBool={ToggleBool} /></div>:null}
    </>)

}