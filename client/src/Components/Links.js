// page for social media links 
import GetMedia from "./Backend-Async/GetMedia";
import { useState,useEffect } from "react";

export default function Links(){
  // usestate to contain the social media items from backend
  const [mediaList,setMediaList] = useState(undefined);
  //useEffect to call the media item from backend
  useEffect(() => {
    const interval = setInterval(() => { 
    GetMedia()
    .then((res) => {
        setMediaList(res);
    })
    .catch((e) => {
        console.log(e.message)
    })
      }, 500);
      return () => clearInterval(interval);
  },[mediaList])

  // map the social media links to html list
    return (
        <div>
            <section className="links">
        <ul>
          <li><h3 className="shadow">Find me on:</h3></li>
          {mediaList!==undefined?mediaList.map((logo)=>{
            return (
            (logo.media==="logo"?<li key={logo.title}><a className="external-link" href={logo.link} target="_blank" rel="noreferrer">{logo.title}<span className="line-up"><img className="external-link-img" src={logo.path} height={"40"} width={"40"} alt={`${logo.title} Logo`}/></span></a></li>:null)
            )
          }):null}
        </ul>
    </section>
        </div>
    )
}