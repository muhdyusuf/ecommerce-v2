import {buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import Link from 'next/link'
import { FC } from 'react'

import SignInForm from '@/app/(auth)/signIn/SignInForm'
import { URLSearchParams } from 'url'

interface pageProps {
  searchParams:{
    next?:string
  }

}



const page: FC<pageProps> = ({searchParams}) => {

  return (
   <>

        <div className="lg:p-8 w-[min(100%,400px)]">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
              {/* <p className="text-sm text-muted-foreground">
                Enter your email below to continue
              </p> */}
            </div>
            <SignInForm redirectTo={searchParams.next}/>
            
            <p className="pt-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
    
    {/* <Link href={"signUp"}
        className={buttonVariants({variant:"link"})}
    >
        Dont have account? sign Up
    </Link> */}
     
   </>)
}

export default page