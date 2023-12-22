'use client' // Error components must be Client Components
 
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

 
  return (
    <main
        className='flex flex-col md:container justify-center items-center'
    >
      <h2>{error.message}</h2>
        <Link
            className={cn(buttonVariants({variant:"link"}))}
            href={`${process.env.NEXT_PUBLIC_APP_URL}`}
        >
            Back to Home
        </Link>
    </main>
  )
}