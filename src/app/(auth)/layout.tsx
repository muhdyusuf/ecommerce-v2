import {FC, ReactNode} from 'react'

interface layoutProps {
 children:ReactNode
}

const layout:FC<layoutProps>=({
    children
})=>{
 return(
    <div
        className='relative p-2 md:container min-h-screen flex flex-col justify-center items-center' 
    >
       {children}
    </div>
)}

export default layout