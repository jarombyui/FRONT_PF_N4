import React, { useState } from 'react'
import { useToggle } from '../hooks/useToggle'

const Select = ({value,setValue,options,title}) => {

   const [isOpen,open,close,toggle] =  useToggle()


   const handleClick =(level)=>{
    setValue(level)
    close()
   }

  return (
    <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">{title}</label>
          <div className="relative">
            <button onClick={toggle} className="w-full border border-gray-400 p-2 text-left flex justify-between items-center">
              {value || 'Tipo:'}  
              <span className="ml-2">&#9660;</span>
            </button>
              {isOpen && <div className="absolute w-full bg-white border border-gray-400 mt-1 rounded-lg z-10">
                {options.map(level => (
                  <button onClick={ () => handleClick(level)} key={level}  className="w-full text-left p-2 hover:bg-gray-100">
                    {level}
                  </button>
                ))}
              </div>}
          </div>
        </div>
  )
}

export default Select