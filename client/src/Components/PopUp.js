import {Modal,Button} from "react-bootstrap";
/* Function for the generic popup */
export default function PopUp(props){

    let message = props.message;// body of popup 
    let type = props.type;//type ie error/success
    let response = props.response//color/classname of text
    let bool = props.bool;// bool to open or close popup
    let ToggleBool = props.ToggleBool;// function to change bool

    return(
        <>
        <div>
    <Modal show={bool} onHide={ToggleBool}>
        <Modal.Header closeButton>
        <Modal.Title>
          <h2 className={response}>New {type}</h2>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {(message!==null&&typeof(message)==="object")?message.map((line)=>{
            let key = Math.floor((Math.random()*1000) * Number(message.indexOf(line)+1));
            return <p className="text-dark" key={key}>{line}</p>
        }):<p className="text-dark">{message}</p>}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={ToggleBool}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>
    </div>
        </>
    )

}