"use client"
import { Input } from '@/components/ui/input'
import {FC, useState} from 'react'
import { Button } from './ui/button'
import { signInSchema } from '@/lib/validations/authForm'

import {z} from 'Zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Github, Loader, Loader2 } from 'lucide-react'

interface SignUpFormProps {
 
}

type SignInSchema=z.infer<typeof signInSchema>

const SignInForm:FC<SignUpFormProps>=({})=>{

    const [passwordHide, setpasswordHide] = useState(true)
    const [isLoading, setisLoading] = useState(false)


    const {
        register,
        handleSubmit,
        formState:{errors}
      }=useForm<SignInSchema>({
        resolver:zodResolver(signInSchema)
      })

    function onsubmit(){

    } 
    
    
 return(
    <div
        className='flex flex-col gap-4'
    >
        <form
             className='w-full  flex flex-col'
             onSubmit={handleSubmit(onsubmit)}
        >
            <div>
                <label htmlFor="email">
                <Input
                    id='email'
                    placeholder='Email'
                    {...register("email")}
                    />
                </label>
                <p
                    className='my-[2px] text-[12px] leading-none min-h-[12px] text-red-400'
                >
                    {errors.email?.message}
                </p>
            </div>

            <div
                className='mb-[12px]'
            >
                <label 
                    htmlFor="password"
                    className='relative'
                >
                <Input
                    id='password'
                    placeholder='Password'
                    type={passwordHide?"password":"text"}
                    className='peer/password'
                />
                <Button
                    variant={"ghost"}
                    type='button'
                    className='absolute right-2 top-0 bottom-0 mt-auto mb-auto p-0 h-min text-muted-foreground block peer-placeholder-shown/password:scale-0 scale-1 transition-transform'
                    onClick={()=>setpasswordHide(!passwordHide)}
                >
                    {!passwordHide?(
                    <Eye
                         className='w-4 aspect-square'
                    />
                    ):(
                    <EyeOff
                        className='w-4 aspect-square'
                    />)}
                </Button>
               
                </label>
            </div>

       
        
        
            <Button
            type='submit'
            variant="default"
            className='bg-primary'
            >
            Sign In
            </Button>
        </form>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
        </div>

        <Button variant="outline" type="button" className='w-full'>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Github className="mr-2 h-4 w-4" />
            )}{" "}
            Github
        </Button>

    </div>
)}

export default SignInForm