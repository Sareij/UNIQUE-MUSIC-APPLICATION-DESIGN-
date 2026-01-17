import { collection,  getDocs } from "firebase/firestore";
import { children, createContext, useEffect, useState } from "react"
import { __DB } from "../backend/firebase";



export let AlbumContextAPI = createContext(null);

let AlbumContext = ({children}) =>{

    let [allAlbums,setAllAlbums] =useState(null);
    // console.log(allAlbums);
    


 let fetchAlbumData = async () =>{
    try {
        let AlbumDataCollectionRef = collection(__DB,"album_collections");

        let AlbumDataFromDB = await getDocs(AlbumDataCollectionRef);

        let AllAlbumsFromDb = AlbumDataFromDB?.docs.map((doc)=>({
              
           id:doc.id,
           ...doc?.data()

        }))
        setAllAlbums(AllAlbumsFromDb)
        console.log("album Data",AllAlbumsFromDb);
        
        
    } catch (error) {
        
    }
 }
     
   useEffect(()=>{
      fetchAlbumData();
   },[])

    return <AlbumContextAPI.Provider value={{allAlbums}}>
             {children}
    </AlbumContextAPI.Provider>
}

export default AlbumContext