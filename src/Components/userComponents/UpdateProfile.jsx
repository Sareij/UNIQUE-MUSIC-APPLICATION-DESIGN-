import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import toast from 'react-hot-toast';
import Spinner from '../../utilities/Spinner';
import { updateProfile } from 'firebase/auth';

const UpdateProfile = () => {

  let {authUser,setAuthuser}=useContext(AuthContextAPI);
  let [imageFile,setImageFile]=useState(null);  //send teh actual image in this file.
  let [imagePreview,setImagePreview]=useState(null); //to preview that image in the container.
  let [isLoading,setIsloading]=useState(false);

  let handleInputChange= (e) =>{
    // console.log(e.target.files[0]); //this in console the target in that files property after that one image is there so 0th index.
    let file = e.target.files[0];

    if(file){
      let imageUrl = URL.createObjectURL(file);
      // console.log(imageUrl);  //it gives one url of our image
      setImagePreview(imageUrl)
      setImageFile(file)  //why? this file receives only file type of data

    }
  }

  let handleSubmit =async (e) =>{
      e.preventDefault();
try{

  setIsloading(true);
  
  let imageFormData = new FormData(); //this formdata is used for the taking the image in this application to database. 

  imageFormData.append("file", imageFile);
  imageFormData.append("upload_preset", "tech haven music 372");
  imageFormData.append("cloud_name", "dfgfclwnx");
                                                                                      //fetch will accept method also
  let cloudinaryResponse = fetch("https://api.cloudinary.com/v1_1/dfgfclwnx/image/upload",{
    method:"POST",
    body:imageFormData

  })

  let ImageResponseFromDB = await (await cloudinaryResponse).json()
  console.log(ImageResponseFromDB);

  updateProfile(authUser, {
    photoURL:ImageResponseFromDB?.url
  })

setAuthuser({
  ...authUser, photoURL:ImageResponseFromDB?.url
})


  console.log(cloudinaryResponse);
  
}
catch(error){
  toast.error(error.message);
}finally{
  setIsloading(false);
}
  }

  return (
    <section className='h-full w-full flex justify-center items-center'>
      <article className='h-[490px] w-[33%] bg-slate-700 rounded-md py-4  px-8 flex flex-col gap-4 items-center'>

        <header>
          <h1 className='text-[24px] font-semibold text-center py-4'>Update Profile</h1>
        </header>

        <main>
          <picture>
               <img src={imagePreview == null ? authUser?.photoURL : imagePreview} alt="" className='h-[250px] w-[250px] border rounded-full' />
          </picture>
        </main>

        <footer>
          <div>
            <form action="" onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="image" className='block border text-center py-2 rounded-md font-semibold px-20 '>Choose Picture </label>
                  <input type="file" id='image' className='hidden ' onChange={handleInputChange}/>
              </div>

              <div className='mt-4'>
                <button className='bg-blue-600 w-full py-2 rounded-md'>Upload Picture</button>
              </div>
            </form>
          </div>
        </footer>
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default UpdateProfile