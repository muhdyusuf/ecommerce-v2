import Link from 'next/link'
import { FC } from 'react'

interface FooterProps {
  
}

const Footer: FC<FooterProps> = ({}) => {
  return (
   <footer
    className='hidden md:block text-sm bg-slate-300 py-4'
   >
     <div
        className='md:container flex flex-wrap justify-between gap-4'
     >
        <div
            className='flex flex-col gap-4'
        >
            <h3
                className='font-bold text-md'
            >
                Contact us
            </h3>
            <ul
                className='flex flex-col gap-2'
            >
                <li>
                    <Link
                        href="/"
                    >
                        Help centre
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                    >
                        Contact Us
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                    >
                        How to buy
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                    >
                        Return  Refund
                    </Link>
                </li>
            </ul>
        </div>
        <div
            className='flex flex-col gap-4'
        >
            <h3
                className='font-bold text-md'
            >
                About
            </h3>
            <ul
                className='flex flex-col gap-2'
            >
                <li>
                    <Link
                        href="/"
                    >
                        About us
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                    >
                        Careers
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                    >
                        Policies
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                    >
                        Blog
                    </Link>
                </li>
            </ul>
        </div>
        <div
            className='flex flex-col gap-4'
        >
            <h3
                className='font-bold text-md'
            >
                Follow us
            </h3>
            <ul
                className='flex flex-col gap-2'
            >
                <li>
                    <Link
                        href="/"
                    >
                        Help centre
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                    >
                        Contact Us
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                    >
                        How to buy
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                    >
                        Return  Refund
                    </Link>
                </li>
            </ul>
        </div>


     </div>
     <div
        className='w-full'
     >
        <p

        >
            &copy;2023 MockECommerce, Inc. All right reserved
        </p>
     </div>
   </footer>
   )
}

export default Footer