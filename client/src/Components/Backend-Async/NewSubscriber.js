// NewSubscriber allows user to subscribe to the site
const NewSubscriber = async(item) => {
    // props are user info 
    const response = await fetch("/user/subscribers", {
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

   export default NewSubscriber