/* user subscriber async function to retrive the users info
This would be send in a link to user so if they wish to change pref
they can open the website and have their subcriber object displayed
*/
const UserSubscriber = async(query) => {
    const response = await fetch(`/user/subscriber?${query}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body:"",
     });
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default UserSubscriber