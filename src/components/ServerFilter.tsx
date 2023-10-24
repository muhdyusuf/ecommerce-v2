'use server'
import { FC } from 'react'

interface ServerFilterProps {
  searchParams:{}
  params:string
}

const ServerFilter: FC<ServerFilterProps> = async ({searchParams,params}) => {
    console.log(params,searchParams)


  return (
    <form>

    </form>
   )
}

export default ServerFilter