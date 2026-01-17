//behave like a parent component

import { Outlet } from "react-router-dom";
import NavbarContainer from "../Components/NavbarComponents/NavbarContainer";
import AdminSideBar from "./AdminSideBar";


let AdminMainContainer = () =>{
    return <section className="min-h-[100vh] w-[100%] bg-slate-900">
        <header>
            <NavbarContainer/>
        </header>
        <main className="flex">
            <aside className="w-[16%] h-[calc(100vh-71px)] bg-slate-700"><AdminSideBar/></aside>
            <aside className="w-[84%] min-h-[calc(100vh-71px)] "><Outlet/></aside>
        </main>
    </section>

}
export default AdminMainContainer;