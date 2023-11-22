import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Github, Loader } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return (
   <div
    className='flex flex-col justify-center items-center min-w-screen min-h-screen'
    
   >

        <Link
          href="/signIn"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <form
                className='w-[min(100%,400px)]  flex flex-col  p-2 gap-2'
            >
                
                <label htmlFor="email">
                    <Input
                        type="email"
                        id='email'
                        placeholder='email'
                    />
                </label>
                <label htmlFor="password">
                    <Input
                        type="password"
                        id='password'
                        placeholder='password'
                    />
                </label>
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
          <Button variant="outline" type="button">
            {true ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}{" "}
            Github
          </Button>
      
   
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
     
   </div>)
}

export default page