/* If in changing subscription pref user wished to remove all info
this function will pass the id to the server to delete the subscribers info */
const UserUnsubscribe = async(query) => {

    const response = await fetch(`/user/subscriber?_id=${query}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
       }
     });
     
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default UserUnsubscribe