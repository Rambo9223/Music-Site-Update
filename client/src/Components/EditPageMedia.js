import { useForm } from "react-hook-form";
import {Modal,Button} from "react-bootstrap";
import { XCircle,CheckCircle } from "react-bootstrap-icons";
import EditMediaAdmin from "./Backend-Async/EditMediaAdmin";
import PopUp from "./PopUp";
import { useState } from "react";

/* Page that allows admins to edit details on the page media items */

export default function EditPageMedia(props){
    let item = props.item;// media item 
    let token = props.token// auth token to pass to server
    let bool = props.bool;// bool for modal 
    let ToggleBool = props.ToggleBool;// function to open/close modal

    let initialPopUp = {// sucess or failure popup 
        message:"",
        type:"",
        response:""
      }
    
    // bool for response popup 
    const [resBool,setResBool] = useState(false);
    // function to add details to popup object
    const [popup,setPopUp] = useState(initialPopUp)
    // toggle response popup and close edit media popup
    const ToggleResBool = () => {setResBool(!resBool);
    if(resBool===true){ToggleBool();}}

    // inintalise react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues:{
            "title":item.title,
            "path":item.path,
            "link":item.link
        }
      });

    // function to handle form submit
    const onSubmit = (data) => {
        EditMediaAdmin(data,token).then((res)=>{// send to backend 
            if(res.ok===true){// if respose is good
                // open response popup with black text
                setResBool(true);
                setPopUp({message:res.message,type:"Sever Response",response:"text-primary"})
            }else{
                // else open response popup with red text
                setResBool(true);
                setPopUp({message:res.message,type:"Sever Response",response:"text-danger"})
            }
        })
        
    }

    return <div>
    {(resBool===false)?
    <Modal show={bool} onHide={ToggleBool}>
        <Modal.Header closeButton>
        <Modal.Title>
          <h2 className="text-dark">Edit Media</h2>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="new-item-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-labels">Title:</label>
          <br />
          <input
            className="form-inputs"
            type="text"
            {...register("title", {
              required: "Title is required.",
            })}
          />
          {errors.title && <p className="errorMsg">{errors.title.message}</p>}
          <br />
          <label className="form-labels">Path: </label>
          <input
            className="form-inputs"
            type="text"
            name="path"
            {...register("path", {
              required: "Path is required.",
            })}
          />
          {errors.path && <p className="errorMsg">{errors.path.message}</p>}
          <br />
          {(item.link)?<><label className="form-labels">Link: </label>
          <input
            className="form-inputs"
            type="text"
            {...register("link", {
              required: "Link is required.",
            })}
          />
          {errors.link && <p className="errorMsg">{errors.link.message}</p>}
          <br /></>:null}
          <label className="form-labels">Id:</label>
          <input
            className="form-inputs"
            type="text"
            value={item.id}
            name="id"
            {...register("id")}
          />
          <label className="form-labels">Media Type:</label>
          <input
            className="form-inputs"
            type="text"
            value={item.media}
            name="media"
            {...register("media")}
          />
        <Button variant="primary" onClick={ToggleBool}>Close <XCircle/>
        </Button>
        <Button variant="success" type="submit">Edit <CheckCircle/></Button>
        </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
    :<PopUp message={popup.message} type={popup.type} response={popup.response} bool={resBool} ToggleBool={ToggleResBool}/>}
    </div>

}