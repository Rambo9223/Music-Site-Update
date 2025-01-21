// NewEnquiry allows a user to submit a new message to the site admin
const NewEnquiry = async(item) => {
    const response = await fetch("/user/enquiries", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(item),
     });
     
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default NewEnquiry