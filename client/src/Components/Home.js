// Home page with about me section and testimonials
import homeBackground from "../Images/CC2A0054.png";
import { useMediaQuery } from "react-responsive";

export default function Home(){
    // useMediaQueries for responsiveness
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1024px)'})

    let content = // content for home page
        <section className="home-content">
            <div>
            <h1>Singer/Songwriter + <br/>Everything in between!</h1>
            <br className="break-small"/>
            <h2 className="faded-title">About Me:</h2>
            <br className="break-small"/>
            <div className="faded">
            <p>I'm a musician born and raised in the North East of Scotland in a little town called Elgin. <br/>
            I'm a singer/songwriter/producer and multi instrumentalist with a passion for creating songs that tell a story. </p><p>My style is defiantly pop/rock with little pulls and feels from R&B and Folk. When performing solo I will normally play acoustically and really focus make a connection with the audience with my vocals and the raw feel of the sound.</p>
            <p>When I'm with the band I can't resist jamming out and really playing to create an amazing atmosphere and have as much fun as possible.</p>
            <p>I'm always working on new music and different styles of songs so keen an eye out for new releases. 
            I'm proud to say I've played previously at Belladrum Tartan Heart Festival, Thunder In The Glens. <br/>I have had my songs played on BBC radio and many other radio shows in Scotland. </p>
            </div>
            </div>
          {/*Nested Video*/}
          <div className="break-small"></div>
          <div id="video-container">
            <h2 className="faded-title">My Newest Single!</h2>
            <div className="break-small"></div>
            <iframe id="home-video" height={"494"} src="https://www.youtube.com/embed/9Q9gvk_WnEA" title="Don&#39;t Spend This One Alone (Official Music Video) 🎬" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        {/*Testemonials*/}
        <div className="break"></div>
        
        <article className="testimonials">
        <h2 className="faded-title">Testimonials:</h2>
        <div className="break-small"/>
          <h4>"Scott is absolutely fantastic. I've seen him live a couple of times now and never disappoints! 💖 Great mix of genres and a few surprises amongst his set. One of the nicest guys on the music scene 👌"</h4>
      </article> 
  
      <article className="testimonials">
          <h4>"Great tunes upbeat lively and fun!"</h4>
      </article>
        </section>

    return (
        <div>
        {isDesktopOrLaptop===true?
        <main id="about-me">
        <div id="background-right">
            <img src={homeBackground} alt="" height="1500" width="2250" />
        </div>
        {content}
        </main>:null}
        {isTabletOrMobile===true?<main id="about-me-small">
        <div id="background-right">
            <img src={homeBackground} alt="" height="1500" width="2250" />
        </div>
        <div className="break-small"></div>
        {content}
        </main>:null}
        </div>
    )
}