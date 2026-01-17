import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextAPI } from "./AuthContext";
import toast from "react-hot-toast";
import { doc, onSnapshot } from "firebase/firestore";
import { __DB } from "../backend/firebase";


export let UserContextAPI = createContext(null);  //UserContextAPI is a children so in main we have to pass the usercontext.

let UserContext = ({children}) =>{
   
let {authUser} = useContext(AuthContextAPI);
// console.log(authUser);
// authUser is the user which is logged in and we are getting from authcontext.

let [userDataFromDB,setUserDataFromDB]= useState(null);  //we store the role type of information

//  console.log("userDataFromDB",userDataFromDB); //this will give the data from the database.
//  console.log("userDataFromDB role",userDataFromDB?.role); //this will give the data from the database.
 
 //userDataFromDB - this will give the data from the database.

let fetchDataFromDB =async  () => {      //whenever we going to fetch from backend this will be async only.
      console.log("fetchdb starting");
      
    if(authUser != null){ //authuser is ourUser only.
       console.log("authuser condition");
       
        try{
              let userDataReference = doc(__DB, "user_profile", authUser?.uid )  //doc(databasename,collection_name,unique Idetification)
//onSnapshot is used for snap the userdata if it is present there.it accept two parameters 1.reference 2.callbackfunc
           
         onSnapshot(userDataReference , (user)=>{   //here,user name willl be nay userdata like this also
             if(user.exists){

                setUserDataFromDB(user?.data())
            //   console.log(user?.data());   
       
         }
        
        });
        }catch(error){
            toast.error(error.message);
        }
    }
}

useEffect(()=>{
    fetchDataFromDB();
},[authUser])  //[] -used for run only once if not it will run again and again


    return <UserContextAPI.Provider value={{userDataFromDB}}>  
            {children}
    </UserContextAPI.Provider>
}

export default UserContext;

//userDataFromDB-information from database of our user.