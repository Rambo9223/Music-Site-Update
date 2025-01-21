import { Reply } from "react-bootstrap-icons";
/* The link to set up the email for a reply from message centre */
export default function MessageReply (props){
    let message = props.message
    return( 
    <>
    <span className="link"><a href={`mailto:${message.email}?subject=${message.subject}&body=${encodeURIComponent(message.enquiry)}`}><Reply/> Reply</a></span>
    </>
    )
}
