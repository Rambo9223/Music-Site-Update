// page for all media embeded links, create a json file to have link addresses to make adding and removing media easier 
// file paths were initially not working - solution! Added media images to public folder and edited the media.json file paths to reflect this
import { useMediaQuery } from "react-responsive";
import GetMedia from "./Backend-Async/GetMedia";
import { useState,useEffect } from "react";

export default function Media(){
    const [mediaList,setMediaList] = useState(undefined);
     // Within the useEffect Hook we retrieve the media items from server
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

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })
    /* using the map array method we map the photos and videos on to the page */
    return (
        <>
        <div id="background-gallery">
        <main id="gallery-content">
        {isTabletOrMobile?<div className="break-large"></div>:null}
        <h2 className="Titles">Image Gallery</h2>
        <div className="gallery" id="images">
        {mediaList!==undefined?mediaList.map((item)=>{
            return (
                (item.media==="image"?<div key={item.title} className="image-wrap">
                    
                    <img className="gallery-image" src={item.path} alt={item.title} />
                    <figcaption>{item.title}</figcaption>
                </div>:null)
            )
        }):null}
        </div>
        {/* Next Add Video section of gallery */}
        <div className="break"></div>
        <h2 className="Titles">Video Gallery</h2>
        <div className="break-small"></div>
        <div className="gallery" id="video">
        {mediaList!==undefined?mediaList.map((item)=>{
            return (
                (item.media==="video"?<div key={item.title} className="image-wrap">
                    <iframe width="500" height="500" src={item.path} title={item.title} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
                </div>:null)
            )
        }):null}
        </div>
        </main>
        </div>
        </>
        
    )
}