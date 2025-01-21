/*Logout Admin allows admin to submit their token for the server to blacklist
either via admin submission or timeout */
const LogoutAdmin = async(token) => {
    let response = await fetch(`/login/logout`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         token:token
       }
     });
     
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default LogoutAdmin