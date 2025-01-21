// similar idea to edit, react hook form with empty values

import { useForm } from "react-hook-form";
import {Modal,Button,Form} from "react-bootstrap";
import { XCircle,CheckCircle } from "react-bootstrap-icons";
import PopUp from "./PopUp";
import { useState } from "react";
import AddMediaAdmin from "./Backend-Async/AddMediaAdmin";

// function for admins to add new media to page 
export default function AddPageMedia(props){

    // if logo/social media item is selected it will have a link as well as a path
    // warning also to make sure any new photos are uploaded to the images folder 

    let token = props.token// auth token
    let bool = props.bool;// form open 
    let ToggleBool = props.ToggleBool; // toggle form 

    let initialPopUp = {
        message:"",
        type:"",
        response:""
      }
    
    const [resBool,setResBool] = useState(false);//boolean for server response
    const [type,setType] = useState("");// handles dropdown values for media type 
    const [popup,setPopUp] = useState(initialPopUp);// hook to change popup values 
    const ToggleResBool = () => {setResBool(!resBool);// handles close of model if response is good
    if(resBool===true){ToggleBool();}}

// initialise hook form 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({});

      // on submit 
    const onSubmit = (data) => {
        AddMediaAdmin(data,token).then((res)=>{// send item to server 
            if(res.ok===true){// if added successfully 
                setResBool(true);// open popup 
                // set popup values 
                setPopUp({message:res.message,type:"Sever Response",response:"text-primary"})
            }else{// else error 
                setResBool(true); // open popup with different message 
                setPopUp({message:res.message,type:"Sever Response",response:"text-danger"})
            }
            reset();// reset form 
        })
    
    }

    return <div>
    {(resBool===false)?
    <Modal show={bool} onHide={ToggleBool}>
        <Modal.Header closeButton>
        <Modal.Title>
          <h2 className="text-dark">Add Media</h2>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form 
        data-testid= "modal-form"
        className="new-item-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-labels">Media Type:</label>
        <Form.Select aria-label="Default select example"
            className="form-inputs"
            type="text"
            name="media"
            {...register("media",
            {   onChange:(e)=>{setType(e.target.value);console.log(type)},
                required:"Media type is required."
                })}>
                <option value={"image"}>Image</option>
                <option value={"video"}>Video</option>
                <option value={"logo"}>Social Media</option>
        </Form.Select>
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
          {(type==="logo")?<><label className="form-labels">Link: </label>
          <input
            className="form-inputs"
            type="text"
            {...register("link", {
              required: "Link is required.",
            })}
          />
          {errors.link && <p className="errorMsg">{errors.link.message}</p>}
          <br /></>:null}
          {/*<input
            className="form-inputs-hidden"
            type="text"
            name="id"
            {...register("id")}
        />*/}
          
        <Button variant="primary" onClick={ToggleBool}>Close <XCircle/>
        </Button>
        <Button variant="success" type="submit">Add <CheckCircle/></Button>
        </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
    :<PopUp message={popup.message} type={popup.type} response={popup.response} bool={resBool} ToggleBool={ToggleResBool}/>}
    </div>

}