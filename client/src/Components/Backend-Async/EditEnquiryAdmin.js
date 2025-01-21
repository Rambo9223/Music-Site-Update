/* Edit enquiry is used to change the status of messages from 
unread to read, is/is not trash in the admin message center*/
const EditEnquiryAdmin = async(item,token) => {
    // message to change, authorisation token
    const response = await fetch("/admin/enquiry", {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
         token:token
       },
       body:JSON.stringify(item),
     });
     // return response.json
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default EditEnquiryAdmin