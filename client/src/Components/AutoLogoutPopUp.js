import {Modal,Button} from "react-bootstrap";

// autologout is the popup that alerts admin their session will end
export default function AutoLogoutPopUp(props){

    let message = props.message;
    let type = props.type;
    let bool = props.bool;
    let ToggleBool = props.ToggleBool;
    

    return(
        <>
        <div>
    <Modal show={bool} onHide={ToggleBool}>
        <Modal.Header closeButton>
        <Modal.Title>
          <h2 className="text-danger">Session {type}</h2>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className="text-dark">{message}</p>
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