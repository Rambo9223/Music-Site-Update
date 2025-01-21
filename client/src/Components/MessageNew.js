import { Pen } from "react-bootstrap-icons"
/* The link and message body when the admin wants to compose a new email */
export default function MessageNew(props){
    let date = new Date();
    let body = `Dear,
    My name is Scott Ramsay.
    Many Thanks
    Scott`
    return( 
    <>
    <a id="new-email" href={`mailto:?subject=${`Scott Ramsay Enquiry - ${date.toISOString().slice(0,10)}`}&body=${encodeURIComponent(body)}`}>{props.bool?null:<>Compose </>} <Pen/></a>
    </>
    )
}