// add media async function for admin
const AddMediaAdmin = async(item,token) => {
    // item to add & authorisation 
    //post to server
    const response = await fetch("/admin/media/new", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         token:token
       },
       body:JSON.stringify(item),
     });
     // return response.json regardless of outcome
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default AddMediaAdmin