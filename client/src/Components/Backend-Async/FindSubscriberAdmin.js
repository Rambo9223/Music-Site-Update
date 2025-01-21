// find subsciber async function
const FindSubscriberAdmin = async(filter,token) => {
    // filter & auth token
    const response = await fetch("/admin/subscribers", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         token:token
       },
       body:JSON.stringify(filter),
     });
     // return res.json
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default FindSubscriberAdmin