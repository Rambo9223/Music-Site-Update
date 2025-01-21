/* Post function to find messages, currently this function returns
all messages however could be modified in future to allow user to 
have a search function */
const FindMessagesAdmin = async(filter,token) => {
    // message filter & auth token
    const response = await fetch("/admin/enquiries", {
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

   export default FindMessagesAdmin