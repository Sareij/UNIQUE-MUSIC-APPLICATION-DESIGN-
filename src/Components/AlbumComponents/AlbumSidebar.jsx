import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import { IoAlbums, IoPersonAddSharp } from 'react-icons/io5'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { RiAlbumFill, RiLockPasswordFill } from 'react-icons/ri'
import { TiUserDelete } from 'react-icons/ti'
import { NavLink } from 'react-router-dom'

const AlbumSideBar = () => {
  return (
    <section className='p-7'>
        <article>
            <ul className='flex flex-col gap-4'>
                <li><NavLink to={"/"} end  className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}>
                         <span><AiOutlineDashboard /></span><span>Dashboard</span>
                    </NavLink>
                </li>
                <li><NavLink to={"/favourites"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}>
                          <span><RiAlbumFill /></span><span>Favourites</span>
                    </NavLink>
                </li>
                
            </ul>
        </article>
    </section>
  )
}

export default AlbumSideBar