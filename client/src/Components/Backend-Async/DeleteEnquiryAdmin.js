// admin media function to delete enquiries
const DeleteEnquiryAdmin = async(query,token) => {
    // message to delete & authorisation token 
    const response = await fetch(`/admin/enquiry?_id=${query}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         token:token
       }
     });
     // return response.json regardless of outcome
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default DeleteEnquiryAdmin