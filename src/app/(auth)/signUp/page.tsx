import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FC } from 'react'
import SignUpForm from '@/components/SignUpForm'

interface pageProps {
  
}


const page: FC<pageProps> = ({}) => {


  return (
   <>
        <Link
          href="/signIn"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-2 top-2 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>

        <div className="lg:p-8 w-[min(100%,400px)]">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignUpForm />
            
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
    
   
     
   </>)
}

export default page