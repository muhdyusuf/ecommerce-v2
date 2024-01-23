import Link from 'next/link'
import { FC } from 'react'

import SignInForm from '@/app/(auth)/signIn/SignInForm'


interface pageProps {
  searchParams:{
    next?:string
  }

}



const page: FC<pageProps> = ({searchParams}) => {

  return (
   <>

        <div className="lg:p-8 w-[min(100%,400px)]">
          <div className="mx-auto flex w-full flex-col justify-center gap-8">
            <div className="flex flex-col text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
              <p
                className='text-muted-foreground font-medium'
              >
                login to enjoy more feature
              </p>
             
            </div>
            <SignInForm redirectTo={searchParams.next}/>
            
            <p className="text-center text-sm text-muted-foreground">
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