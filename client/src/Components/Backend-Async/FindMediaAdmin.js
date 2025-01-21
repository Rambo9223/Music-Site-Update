/* POST function to filter and return certain or all media items to the 
Admin page */
const FindMediaAdmin = async(filter,token) => {
    // server filter and auth token
    const response = await fetch("/admin/media", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         token:token
       },
       body:JSON.stringify(filter),
     });
     // return response.json
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default FindMediaAdmin