import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AudioPlayerContextAPI } from '../../context/AudioPlayerContext';
import CustomAudioPlayer from 'react-pro-audio-player';

const AlbumDetails = () => {
 let data = useLocation();
//  console.log("data from album ",data);

 let {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex} = useContext(AudioPlayerContextAPI)


let AlbumDetails = data?.state;
console.log(AlbumDetails);

// console.log(Math.floor(AlbumDetails?.AllSongs[0].songDuration)/60,(AlbumDetails?.AllSongs[0].songDuration)%60);
//  console.log(AlbumDetails?.AllSongs[0].songDuration%60);  
// Function to format the song duration in seconds (e.g., 302.210688) to MM:SS format
const formatDuration = (duration) => {
    if (typeof duration === 'number') {
        const minutes = Math.floor(duration / 60);  // Get minutes
        let seconds = Math.floor(duration % 60);   // Get seconds
        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`; // Add leading zero if seconds < 10
        return `${minutes}:${seconds}`; // Return in MM:SS format
    }
    return "00:00"; // Fallback for invalid duration
};



  return (
    <section className='h-full w-full '>
      <article className='h-full w-full '>
       <header>
       <header className='h-[370px] w-full bg-slate-800 rounded-md flex p-6 gap-10'>
           <aside className='w-[50%]'>
            <picture>
                <img src={AlbumDetails?.albumPoster} alt="" className='h-[280px]  rounded-md' />
            </picture>
           </aside>
           <aside className='flex flex-col gap-2'>
            <h1 className='text-[24px] font-thin'>{AlbumDetails?.albumTitle}</h1>
            <p className=' flex gap-2 items-center'>
                <span>No Of Tracks : </span>
                <span className='bg-blue-600 py-1 px-4 rounded-md'>{AlbumDetails?.AllSongs.length}</span>
            </p>
            <p className=' flex gap-2 items-center'>
                <span>Languages : </span>
                <span >{AlbumDetails?.albumLanguages}</span>
            </p>
            <p className=' flex gap-2 items-center'>
                <span>Release Date : </span>
                <span >{AlbumDetails?.albumReleaseDate}</span>
            </p>
            <div className=' flex gap-2  '>
                <span>Description :</span>
                <p className='w-[85%]' >{AlbumDetails?.albumDescription}</p>
            </div>
            </aside>
        </header>
       </header>
       <main className='mt-20'>
        <table className='w-full text-left'>
            <thead className='bg-slate-700'>
                <tr>
                    <th className='px-1 py-2'></th>
                    <th className='px-1 py-3'></th>
                    <th className='px-1 py-3'>Song Name</th>
                    <th className='px-1 py-3'>Singers</th>
                    <th className='px-1 py-3'>Music Director</th>
                    <th className='px-1 py-3'>Mood</th>
                    <th className='px-1 py-3'>Duration</th>
                </tr>
            </thead>

            <tbody>
              {AlbumDetails?.AllSongs?.map((song,index)=>{
                return <tr key={index} className='bg-slate-800 ' onClick={()=>{
                    setSongs(AlbumDetails?.AllSongs);
                    setCurrentSongIndex(index);
                    setIsPlaying(!isPlaying);
                }}>
                    <td className='py-1 text-center'>{index+1}</td>
                    <td className='py-2 pl-6 w-[90px]'>
                        <img src={song?.songThumbnail} alt="" className='h-[60px]  rounded-sm pl-6 ' />
                    </td>
                    <td className='py-1 pl-4'>{song?.songName}</td>
                    <td className='py-1 '>{song?.songSingers}</td>
                    <td className='py-1 '>{song?.songMusicDirector}</td>
                    <td className='py-1 '>{song?.songMood}</td>
                    <td className='py-1 '> {formatDuration(song?.songDuration)}</td>
                    
                </tr>
              })}
            </tbody>
        </table>
       </main>
      </article>
      
    </section>
  )
}

export default AlbumDetails;