import { useState } from "react"

export const useToggle = (prop= false)=>{

    const [value,setValue] = useState(prop)

    const open =()=>{
        setValue(true)
    }

    const close =()=>{
        setValue(false)
    }

    const toggle =()=>{
        setValue(!value)
    }

    return [value,open,close,toggle]

}
