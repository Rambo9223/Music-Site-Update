// admin media function to delete page media
const DeleteMedia = async(query,token) => {
  // media id to delete & authorisation token
  const response = await fetch(`/admin/media?_id=${query}`, {
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

   export default DeleteMedia