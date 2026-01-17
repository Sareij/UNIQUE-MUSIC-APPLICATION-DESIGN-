import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import ResetPassword from "../Components/Auth/ResetPassword";
import UserMainContainer from "../Components/userComponents/UserMainContainer";
import UpdateProfile from "../Components/userComponents/UpdateProfile";
import UpdatePassword from "../Components/userComponents/UpdatePassword";
import DeleteAccount from "../Components/userComponents/DeleteAccount";
import MyAccount from "../Components/userComponents/MyAccount";
import AddProfile from "../Components/userComponents/AddProfile";
import AdminMainContainer from "../AdminComponents/AdminMainContainer";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import CreateAlbum from "../AdminComponents/CreateAlbum";
import AllAlbums from "../AdminComponents/AllAlbums";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import AlbumDetails from "../Components/AlbumComponents/AlbumDetails";
import PageNotFound from "../Pages/PageNotFound";





let Myroutes = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/album-details",
                element:<AlbumDetails/>

            },
            {
                path:"login",
                element:<PublicRoutes>
                    <Login/>
                </PublicRoutes>
            },
            {
                path:"register",
                element:<PublicRoutes>
                    <Register/>
                </PublicRoutes>
            },
            {
                path:"reset-password",
                element:<PublicRoutes>
                    <ResetPassword/>
                </PublicRoutes>
            }
        ]
    },
    {
        path:"user-profile",
        element:<PrivateRoutes>
                    <UserMainContainer/>
               </PrivateRoutes>,
        children:[
            {
                index:true,
                element:<MyAccount/>
            },
            {
                path:"update-profile",
                element:<UpdateProfile/>
            },
            {
                path:"add-profile",
                element:<AddProfile/>
            },
            {
                path:"update-password",
                element:<UpdatePassword/>
            },
            {
                path:"delete-account",
                element:<DeleteAccount/>
            }
        ]
        
    },
    {
        path:"admin",
        element:<AdminRoute><AdminMainContainer/></AdminRoute>,
        children:[  
            {
                index:true,                          //if index:true here it referes only the parent container or path:"admin" are same
                element:<AdminDashboard/> 
            },
            {
                path:"create-album",
                element:<CreateAlbum/>
            },
            {
                path:"all-albums",
                element:<AllAlbums/>
            }
        ]
    },
    {
        path:"*",
        element:<PageNotFound/>
    }
]);

export default Myroutes