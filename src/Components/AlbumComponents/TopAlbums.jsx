import React, { useContext } from 'react'
import { AlbumContextAPI } from '../../context/AlbumContext'
import { NavLink } from 'react-router-dom';

const TopAlbums = () => {

    let {allAlbums}=useContext(AlbumContextAPI);
    // console.log(allAlbums);

    
  return (
    <section>
        <article>
            <header><h1 className='text-[24px] font-semibold'>Top Albums</h1></header>

            <main className='py-4 flex  flex-wrap gap-6'>
             {allAlbums?.map((album,index)=>{
                return <div key={index} className='h-[260px] w-[200px] bg-slate-800 rounded-md p-3'>
                      <NavLink to={"/album-details"} state={album}>
                      <picture>
                        <img src={album?.albumPoster} alt="" className='h-[200px] w-[180px] rounded-sm object-cover'/>
                      </picture>
                      <p className='text-center text-[18px] font-semibold py-2'>{album?.albumTitle}</p>
                      </NavLink>
                </div>
             })}

            </main>
        </article>
    </section>
  )
}

export default TopAlbums