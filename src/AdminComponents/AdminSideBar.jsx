import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import { IoAlbums, IoPersonAddSharp } from 'react-icons/io5'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { RiAlbumFill, RiLockPasswordFill } from 'react-icons/ri'
import { TiUserDelete } from 'react-icons/ti'
import { NavLink } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <section className='p-7'>
        <article>
            <ul className='flex flex-col gap-4'>
                <li><NavLink to={"/admin"} end  className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}>
                         <span><AiOutlineDashboard /></span><span>Dashboard</span>
                    </NavLink>
                </li>
                <li><NavLink to={"/admin/create-album"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}>
                          <span><RiAlbumFill /></span><span>Create Album</span>
                    </NavLink>
                </li>
                <li><NavLink to={"/admin/all-albums"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}>
                          <span><IoAlbums /></span><span>All Albums</span>
                      </NavLink>
                </li>
            </ul>
        </article>
    </section>
  )
}

export default AdminSideBar