import React from 'react'
import { ImProfile } from 'react-icons/im'
import { IoPersonAddSharp } from 'react-icons/io5'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { TiUserDelete } from 'react-icons/ti'
import { NavLink } from 'react-router-dom'

const UserSideBar = () => {
  return (
    <section className='p-7'>
        <article>
            <ul className='flex flex-col gap-4'>
                <li><NavLink to={"/user-profile"} end  className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><MdAccountBalanceWallet /></span><span>My account</span></NavLink></li>
                <li><NavLink to={"update-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><ImProfile /></span><span>Update Profile</span></NavLink></li>
                <li><NavLink to={"add-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><IoPersonAddSharp /></span><span>Add Profile</span></NavLink></li>
                <li><NavLink to={"update-password"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><RiLockPasswordFill /></span><span>Update Password</span></NavLink></li>
                <li><NavLink to={"delete-account"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><TiUserDelete /></span><span>Delete Account</span></NavLink></li>
            </ul>
        </article>
    </section>
  )
}

export default UserSideBar