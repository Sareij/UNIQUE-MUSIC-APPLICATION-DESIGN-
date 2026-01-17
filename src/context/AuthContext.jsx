import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { __AUTH } from "../backend/firebase";

export let AuthContextAPI = createContext();

let AuthContext = ({children}) =>{

    let [authUser,setAuthuser]=useState(null);
    // console.log(authUser);
    

    useEffect(()=>{
      onAuthStateChanged(__AUTH, (user)=>{ //user is anything we can give our own  --user- print the output is(userImpl)
          console.log(user);  //- we should sotre it in state and utilizing

        if(user?.emailVerified && user?.accessToken) {  //in user the access token is unique
               setAuthuser(user)
        window.localStorage.setItem("TOKEN",user?.accessToken)  //accessToken is a unique identity at a time user can open inany application like phone,laptop
    }
    else{
        setAuthuser(null)
        window.localStorage.clear();
    }
})
    },[])
  return <AuthContextAPI.Provider value={{authUser,setAuthuser}}>
            {children}
  </AuthContextAPI.Provider>
}
export default AuthContext