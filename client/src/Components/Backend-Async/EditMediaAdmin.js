/* PUT Function to edit a media items title, path or link
 */
const EditMediaAdmin = async(item,token) => {
    // item to edit & auth token
    const response = await fetch("/admin/media", {
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

   export default EditMediaAdmin