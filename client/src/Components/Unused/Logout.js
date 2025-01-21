// import async function

// usused function in page, delete

import LogoutAdmin from "./Backend-Async/LogoutAdmin";

// I think this function may be redundant in the sense it limits the responses I can give to the user
// so maybe dont use and just go direct to the logout admin function

// when user logs out or auto logout
function Logout(token){
    console.log(token);
    if(token!==undefined){
    LogoutAdmin(token).then((res)=>{
        if(res.ok === true){
            // clear all stored items
            // alert(res.message);
            localStorage.clear();
            // reload to clear page
            window.location.reload();
            
        }else{
            //console.log(res);
            console.log(`Status - ${res.status}. ${res.message}`)
        }
    })
}  
}


