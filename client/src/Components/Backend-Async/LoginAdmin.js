//LoginAdmin allows admin to submit login details to server & view admin paths
const LoginAdmin = async(item) => {
    // send admin json object 
    const response = await fetch(`/login/`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body:JSON.stringify(item),
     });
     // return the res.json with the auth key
     if (response.status !== 200) {
       return response.json();
     } else {
       return response.json();
     }
   };

   export default LoginAdmin