

import React, { useState } from 'react'
import Spinner from '../utilities/Spinner';
import toast from 'react-hot-toast';
import { addDoc, collection } from 'firebase/firestore';
import { __DB } from '../backend/firebase';

const CreateAlbum = () => {
 
  let initialAlbumState = {
    albumTitle:"", 
    albumPoster:"",
    albumReleaseDate:"",
    albumLanguages:"",
    albumDescription:""
  }

  let initialSongState = {
    songName:"",
    songUrl:"",  //url - mp3 file
    songThumbnail:"",
    songSingers:"",
    songMood:"" ,      //the songs type or gernre
    songMusicDirector:""
  }

  let [albumState,setAlbumState] = useState(initialAlbumState);
  let [songsState,setSongsState] = useState([initialSongState]);  //why [] - this one album has multiple songs will be there so []

  let [isLoading,setIsloading] =useState(false);

   let [albumThumbnailPoster,setAlbumThumbnailPoster] = useState(null)

  let {albumTitle,albumPoster,albumReleaseDate,albumLanguages,albumDescription} = albumState;

  //handling album {poster}

  let handleAlbumPoster = (e) =>{
    let file = e.target.files[0];
    if(file){
      setAlbumThumbnailPoster(file);
    }
  }

//handle input changes in album form
 let handleAlbumInputChange = (e) =>{
  let {name,value} = e.target;

  setAlbumState({
    ...albumState,[name]:value
  })

 }

//Add section method for song

let addSongSection = (e) =>{ 
  e.preventDefault();  //we need the one more state is need to add by clicking the add section
  setSongsState([
    ...songsState,{
      songName:"",
    songUrl:"",  
    songThumbnail:"",
    songSingers:"",
    songMood:"" ,     
    songMusicDirector:""

    }
  ])
}
// remove song section  if we are removing we need to know which is to remove
let removeSongSection = (index,e) =>{
  e.preventDefault();

  if(index>0){  //index=0 so song1 is not been deleted
  setSongsState(songsState.filter((el,index)=>{  //in songsState index 0,1,2,3 like that
    return ind !=index;  //1 !=1 is false 
  }))

}
}

//Handling the Songs Input 

let handleSongsInputChange = (index,e) =>{ //why index? this index is used to getto know the which song is entered in each song1 and song2 etc...
    let {name,value} = e.target;

    let updatedState = [...songsState];  //songsState  - this will contain initial array //creating a copy of the updated state

    updatedState[index][name]=value;  //like song name is same for 2 sections if i entering anything index1 and intialzed to it name and value

    setSongsState(updatedState);
}
//handling files pf songs section

let handleSongsFilesInput = (index,inpName,e)=>{ //inpName=which name of input is taking
    let updatedSongs = [...songsState];  //initializing the array and it stored

    updatedSongs[index][inpName] = e.target.files[0];

    setSongsState(updatedSongs)
}

  //form submit Method

  let handleFormSubmit =async (e) =>{
    e.preventDefault();
    // console.log(albumState);
    // console.log(albumThumbnailPoster);
    
    try {
      
      setIsloading(true);
      //which file,preset ot collection,wchich db

      let AlbumPosterFormData = new FormData();
      AlbumPosterFormData.append("file", albumThumbnailPoster); //getting the data by this 
      AlbumPosterFormData.append("upload_preset", "tech haven music 372")
      AlbumPosterFormData.append("cloud_name", "dfgfclwnx");
  
      let cloudinaryResponse = fetch("https://api.cloudinary.com/v1_1/dfgfclwnx/image/upload",{    //sending the data by this method post
        method:"POST",
        body:AlbumPosterFormData
    
      })
    
      let AlbumPosterUrlFromDB = await (await cloudinaryResponse).json()
      // console.log(AlbumPosterUrlFromDB);
      

      // let payload = {...albumState, albumPoster:AlbumPosterUrlFromDB?.url}
      // console.log(payload);

      let songsUrl = songsState.map(async(song,index)=>{
             
        let songThumbnailFormdata = new FormData();
        songThumbnailFormdata.append("file" , song?.songThumbnail)
        songThumbnailFormdata.append("upload_preset", "tech haven music 372")

        let cloundinaryResponseOfSongThumbnaildata = fetch("https://api.cloudinary.com/v1_1/dfgfclwnx/upload",{
          method:"POST",
          body:songThumbnailFormdata
        })
        let songPosterUrlFromDB = await(await cloundinaryResponseOfSongThumbnaildata).json();
        // console.log(songPosterUrlFromDB);
        
        let songURLFormdata=new FormData();
        songURLFormdata.append("file",song?.songUrl);
        songURLFormdata.append("upload_preset","tech haven music 372");
        songURLFormdata.append("cloud_name","dfgfclwnx")

        let cloudinaryResponseOfSongURLData = fetch("https://api.cloudinary.com/v1_1/dfgfclwnx/upload",{
            method:"POST",
            body:songURLFormdata
        })
        let SongMP3UrlFromDB=await(await cloudinaryResponseOfSongURLData).json()
        
        // console.log(SongMP3UrlFromDB);
        // console.log("songMP3 URL",SongMP3UrlFromDB);
        // console.log("songPoster URL",songPosterUrlFromDB);

 return ({...song, songThumbnail:songPosterUrlFromDB ?.url, songUrl:SongMP3UrlFromDB?.url, songDuration: SongMP3UrlFromDB?.duration})  //here we are initalizing the songThumbnail with songPosterUrlFromDB

        //?songsState iterates ends here

      })
 
    
      

  let SongsDataFromCloudinaryResponse = await Promise.all(songsUrl);

  let Payload = {...albumState, albumPoster:AlbumPosterUrlFromDB?.url, AllSongs:[...SongsDataFromCloudinaryResponse]}  //we are not sending file to cloudinary we just pasted in albumState
  // console.log("last checking payload",Payload);

  let album_collection_ref = collection(__DB,"album_collections");

  let albumDataForDB = await  addDoc(album_collection_ref, Payload);

   toast.success("Data Storeed Successfully");

     // console.log("Album poster",AlbumPosterUrlFromDB?.url);
  
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      
    }finally{
      setIsloading(false)
    }
  }

  return (
    <section className='h-full w-full flex justify-center '>
       <article className='min-h-[400px] w-[65%] bg-slate-800 rounded-md mt-12 pt-4 px-8'> 
        <header><h1 className='text-[24px] text-center font-semibold '>Create Album</h1></header>
            <hr  className='my-2 '/>
            {/* Form starting */}
            <main>
              {/* album form starting */}
              <header className='my-4'>
                <h1 className='text-[20px] font-semibold'>Album Details</h1>
              </header>

              <article>
                 <form action="" onSubmit={handleFormSubmit}>
                  {/* album starts */}
                    <header className='flex flex-wrap justify-between gap-y-4'>
                      {/* first row album  */}
                        <div className='flex flex-col gap-2 w-[48%] '>
                          <label htmlFor="albumTitle">Album Title</label>
                          <input type="text" name='albumTitle' onChange={handleAlbumInputChange} value={albumTitle} placeholder='Enter Album Title' className='outline-none py-2 px-2 border rounded-md' />
                        </div> 
                        <div className='flex flex-col gap-2 w-[48%]'>
                          <label htmlFor="albumPoster">Album Poster</label>
                          <input type="file"  name='albumPoster'  onChange={handleAlbumPoster} className='outline-none py-2 px-2 border rounded-md file:bg-blue-600 file:px-1 file:rounded-sm' />
                        </div>
                      {/* second row  album*/}
                        <div className='flex flex-col gap-2 w-[48%]'>
                          <label htmlFor="albumReleaseDate">Album Release Date</label>
                          <input type="date" name='albumReleaseDate' value={albumReleaseDate} onChange={handleAlbumInputChange} className='outline-none py-2 px-2 border rounded-md' />
                        </div>
                        <div className='flex flex-col gap-2 w-[48%]'>
                          <label htmlFor="albumLanguages">Album Languages</label>
                          <input type="text" placeholder='Enter Languages' value={albumLanguages} onChange={handleAlbumInputChange} name='albumLanguages'  className='outline-none py-2 px-2 border rounded-md' />
                        </div>
                        {/* third row album */}
                        <div className='flex flex-col gap-2 w-[100%]'>
                          <label htmlFor="albumDescription">Album Description</label>
                          <textarea name="albumDescription" value={albumDescription} onChange={handleAlbumInputChange} className='py-2 px-2 border rounded-md' placeholder='Enter the Description'  >
                          </textarea>
                        </div>
                    </header>
                  {/* album ends */}
                    
                    {/* songs Form starts here   songstate is array of objects inititaly one so we are using map  */}

                     <main>
                      <header><h1 className='text-[20px] font-semibold py-4 '>Songs Section</h1></header> 
{/* iterating the songsState here song - means - element */}  
                      {songsState?.map((song,index)=>{
                        return <section className='bg-slate-700 w-[100%] min-h-[250px] rounded-md my-4 py-2 px-6'>
                          
                         <header><h1 className='text-[18px] text-center font-semibold '>Song {index+1}</h1></header>

 {/* this is songs divs section */}

                      <main className='flex justify-between flex-wrap gap-y-4'>
                        <div className='flex flex-col gap-2 w-[32%]'>   
                          {/* First row songs section i want 3 input field in one row 1 row=100% so div is 32% */}
                          <label htmlFor="">Song Name </label>
                          <input type="text" name='songName' value={song?.songName} onChange={(e)=>handleSongsInputChange(index,e)} placeholder='Enter song name' className='outline-none border rounded-md py-2 px-2' />
                        </div>
                        <div className='flex flex-col gap-2 w-[32%]'>   
                     {/* here  handleSongsFilesInput accepts three paramenter event,index,inpName=songUrl for file as text we should not specify the value attribute*/}
                          <label htmlFor="">Song Url </label>
                          <input type="file" name='songUrl'  onChange={(e)=>handleSongsFilesInput(index,"songUrl",e)}  className='outline-none border rounded-md py-2 px-2 file:bg-blue-600 file:px-1 file:rounded-md' />
                        </div>  
                        <div className='flex flex-col gap-2 w-[32%]'>   
                         
                          <label htmlFor="">Song Poster </label>
                          <input type="file" name='songThumbnail' onChange={(e)=>handleSongsFilesInput(index,"songThumbnail",e)}  className='outline-none border rounded-md py-2 px-2' />
                        </div>

                         {/* second row songs section */}
                         <div className='flex flex-col gap-2 w-[32%]'>   
                          {/* second row songs section i want 3 input field in one row 1 row=100% so div is 32% */}
                          <label htmlFor="">Song Singers </label>
                          <input type="text" name='songSingers' value={song?.songSingers} onChange={(e)=>handleSongsInputChange(index,e)} placeholder='Enter singers' className='outline-none border rounded-md py-2 px-2' />
                        </div>
                        <div className='flex flex-col gap-2 w-[32%]'>   
                         
                          <label htmlFor="">Song Mood </label>
                          <input type="text" name='songMood'  value={song?.songMood} onChange={(e)=>handleSongsInputChange(index,e)} placeholder='Enter song mood' className='outline-none border rounded-md py-2 px-2' />
                        </div>
                        <div className='flex flex-col gap-2 w-[32%]'>   
                          
                          <label htmlFor="">Song  Music Director</label>
                          <input type="text" name='songMusicDirector' value={song?.songMusicDirector} onChange={(e)=>handleSongsInputChange(index,e)} placeholder='Enter music director' className='outline-none border rounded-md py-2 px-2' />
                        </div>

                      </main>
                      
                      <footer className='flex justify-between py-6'>
                        <button className='py-2 px-4 bg-red-600 rounded-md ' onClick={(e)=>removeSongSection(index, e)}>Remove Section</button>
                        {index == songsState.length-1 && <button className='py-2 px-4 bg-blue-600 rounded-md ' onClick={addSongSection}>Add Section</button>
                      }
                      </footer>  
{/* in onclick in the addsection is whenever we click prevent the default */}
                        </section>
                      })}
                      
                      

                     </main>

                    {/* songs Form ends here */}


                  {/* Submit part starts */}
      
                      <footer>
                        <button className='bg-blue-600 hover:bg-blue-800 w-[100%] py-2  rounded-md'>Submit</button>
                      </footer>


                  {/* Submit part ends */}

                 </form>
           

              </article>
              {/* album form ending */}

            </main>
            {/* Form Ending */}
       </article>
{isLoading && <Spinner/>}
    </section>
  )
}

export default CreateAlbum
