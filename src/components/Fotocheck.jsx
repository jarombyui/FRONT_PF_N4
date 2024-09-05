import React from 'react'
import profile from "/public/logos del header/usuario_default.png"

const Fotocheck = ({ data }) => {
   return (

      <div className="p-2">
         <div className="w-[450px] h-[200px] rounded-xl border border-black flex bg-[url('/public/wallpaper-login.jpg/')]">
            <div className='w-2/3  p-7 flex flex-col justify-between'>
               <h1 className='text-center font-bold text-[20px]'>INGLES </h1>
               <div className=''>
                  <h3 className='font-medium text-[15px]'>{data?.nombres}</h3>
                  <h3 className='font-medium text-[15px]'>{data?.apellidos}</h3>
                  <h3 className='font-medium text-[15px]'>{data?.email}</h3>
                  {/* <h3 className='font-medium text-[15px]'>documento</h3> */}
               </div>
            </div>
            <div className='w-1/1 p-7 '>
               <figure className='w-full h-full rounded-xl bg-white'>
                  <img src={"https://picsum.photos/200"} alt="" className='w-full h-full' />
               </figure>
            </div>
         </div>
      </div>
   )
}

export default Fotocheck
