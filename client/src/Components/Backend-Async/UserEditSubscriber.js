// Function for user to edit their subscribtion preferences
const UserEditSubscriber = async(item) => {
    // item is subscriber object to edit
    const response = await fetch(`/user/subscribers`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body:JSON.stringify(item),
     });
     
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default UserEditSubscriber