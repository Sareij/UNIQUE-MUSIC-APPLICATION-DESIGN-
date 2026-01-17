
import {  sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { useContext, useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5"
import { NavLink, useNavigate } from "react-router-dom"
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";
import Spinner from "../../utilities/Spinner";
import { AuthContextAPI } from "../../context/AuthContext";

let UpdatePassword = () =>{

  let {authUser, setAuthuser } = useContext(AuthContextAPI);
    let [isLoading,setIsloading]=useState(false);
    let navigate = useNavigate();

     let initialState={
      newPassword:"",
      confirmNewPassword:""
     }

let [passwordData, setPasswordData]=useState(initialState);

    let handleInputChange = (e) =>{
        let {name, value} = e.target;
        setPasswordData({
          ...passwordData, [name]:value
        })
    }

    let {newPassword,confirmNewPassword}=passwordData;

    let handleSubmit = async (e) =>{
       e.preventDefault();

try{
  setIsloading(true)
    if(newPassword == confirmNewPassword){
      await updatePassword(authUser,newPassword);
      toast.success("Password has been changed successfully")
      signOut(__AUTH);
      setAuthuser(null);
      navigate("/login");
    }else{
      toast.error("New password should match with Confirm password")
    }

    
}catch(error){
    
     toast.error(error.message);
     console.log(error);
}
finally{
  setIsloading(false);
}
       
    }

    return <section className="h-[calc(100vh-70px)] w-[100%] flex justify-center items-center">
        <article className=" w-[27%] bg-slate-700 py-4 px-6 rounded-md">
            <header><h1 className="text-center text-[24px] font-semibold">Update Password</h1></header>
            <main>
                <form action="" onSubmit={handleSubmit}className="flex flex-col gap-2">
                   
                    <div>
                        <label htmlFor="newPassword" className="block py-1">New Password</label>
                        <input type="text" name="newPassword" required onChange={handleInputChange} value={newPassword} placeholder="Enter new password" className="outline-none border-1 w-[100%] rounded-md pl-2 py-1"/>
                    </div>

                    <div>
                        <label htmlFor="confirmNewPassword" className="block py-1">Confirm New Password</label>
                        <input type="text" name="confirmNewPassword" required onChange={handleInputChange} value={confirmNewPassword}  placeholder="Enter confirm new password" className="outline-none border-1 w-[100%] rounded-md pl-2 py-1"/>
                    </div>

                    <div className="mt-3">
                        <button className="bg-blue-600 w-[100%] py-2 rounded-md cursor-pointer hover:bg-blue-800">Submit</button>
                    </div>
             
                    
                </form>
            </main>
        </article>
        {isLoading && <Spinner/>}
    </section>
}
export default UpdatePassword





//https://i.ibb.co/fdjdkDLz/user-white.png -photo-url