import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContextAPI } from '../context/UserContext';

// const AdminRoute = ({children}) => {
//             let {userDataFromDB}= useContext(UserContextAPI);
           
//             console.log("AdminRoute is rendering!");

//             console.log("data from admin route", userDataFromDB);
            
//             console.log("data from admin route role is : ", userDataFromDB?.role);
//             if(userDataFromDB?.role === "admin"){
//                return <>{children}</>
//             }else{
//                 return <Navigate to={"/user-profile"}/>
//             }
    
// }

// export default AdminRoute


//changed chagpt code -- but varuthu so modified a bit
const AdminRoute = ({ children }) => {
    let { userDataFromDB } = useContext(UserContextAPI);

    console.log("AdminRoute is rendering!");
    console.log("data from admin route", userDataFromDB);

    // ⭐ Fix starts here
    if (userDataFromDB === null || userDataFromDB === undefined) {
        console.log("Waiting for Firestore...");
        return <div>Loading...</div>;  // don't redirect yet
    }
    // ⭐ Fix ends here

    if (userDataFromDB.role === "admin") {
        return <>{children}</>;
    } else {
        return <Navigate to={"/user-profile"} />;
    }
};

export default AdminRoute;