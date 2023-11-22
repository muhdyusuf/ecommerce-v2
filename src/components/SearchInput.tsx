'use client'
import { FC,useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import { z } from "Zod";
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import {Search,X} from 'lucide-react'
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

const QuerySchema=z.string().min(3).max(30)

interface SearchInputProps {
  
}

const SearchInput: FC<SearchInputProps> = ({}) => {

    const [inputValue,setInputValue]=useState<string>("")
    const searchParams=useSearchParams()

    useEffect(()=>{
        const search=searchParams.get('search')
        if(!search)return
        setInputValue(search)
    },[])
    
    const router=useRouter()
    

    function onSubmit(e:React.FormEvent){
        e.preventDefault()
        const trimmedValue=inputValue.trim()
        if(trimmedValue===""){
            alert("input value cannot be empty")
        }
        else{
            router.push(`${process.env.NEXT_PUBLIC_APP_URL}/shop?search=${inputValue}`)
        }

    }
 

  return (
    <form
        className='w-[min(80%,400px)] bg-slate-200 flex
        rounded-md justify-between'
        onSubmit={onSubmit}
    >
        <label 
            htmlFor="searchbox"
            className='relative flex w-full'
        >
            <Input 
                type="text"
                id='searchbox'
                placeholder='Search..' 
                className={cn("bg-transparent py-0 m-0 peer focus:border-offset-0")}
                minLength={3}
                required
                onChange={(e)=>setInputValue(e.target.value)}
                value={inputValue}
                
            />
            <X 
                className='absolute right-2 top-0 bottom-0  w-4 p-[1px] h-auto aspect-square m-auto bg-slate-300 rounded-full scale-0  overflow-hidden transition-transform ease-in peer-[:not(placeholder-shown)]:transform-none peer-[:focus:placeholder-shown]:scale-0 peer-[:placeholder-shown]:scale-0 cursor-pointer '
                onClick={()=>setInputValue("")}
            />
        </label>
       

        

        <Button
            type="submit"
            variant={"ghost"}
            className={cn("p-2 m-0")}
            id='submit-search-button'
            aria-label='Aria Submit Search Button'
        >
            <Search
                className='h-full w-auto aspect-square text-slate-400'
                strokeWidth={1.75}
            />
        </Button>

    </form>
   )
}

export default SearchInput