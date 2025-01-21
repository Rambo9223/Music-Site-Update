/* GetMedia is the user function to return the 
JSON object with the media paths  */
const GetMedia = async() => {

    const response = await fetch("/user/media", {
       method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
      body:"",
    });
     
     if (response.status !== 200) {
       return (`Error ${response.status}!`);
     } else {
       return response.json();
     }
   };

   export default GetMedia