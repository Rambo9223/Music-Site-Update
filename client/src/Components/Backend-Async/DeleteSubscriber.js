// admin function to delete page subscriber
const DeleteSubscriber = async(query,token) => {
    // subscriber id & authorisation token
    const response = await fetch(`/admin/subscriber?_id=${query}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         token:token
       }
     });
     // return response.json
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default DeleteSubscriber