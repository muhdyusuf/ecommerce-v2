import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

interface FooterProps {
  
}

const Footer: FC<FooterProps> = ({}) => {
  return (
   <footer
    className='text-sm bg-secondary py-6 w-full self-end'
   >
     <div
        className='md:container flex flex-wrap justify-between gap-4 py-4 p-1'
     >
        <div
            className='w-64 flex flex-col gap-2'
        >
            <h4
                className='text-xl font-bold'
            >
                noCommerce
            </h4>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, eaque!
            </p>
            <ul
                className='flex gap-2'
            >
                <li>
                    <Facebook
                        className='stroke-muted-foreground w-5 aspect-square'
                    />
                </li>
                <li>
                    <Instagram
                        className='stroke-muted-foreground w-5 aspect-square'
                    />
                </li>
                <li>
                    <Twitter
                        className='stroke-muted-foreground w-5 aspect-square'
                    />
                </li>
            </ul>
        </div>
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
 



     </div>
    <div
            className='w-full md:container'
        >
        <p>
            &copy;2023 MockECommerce, Inc. All right reserved
        </p>
    </div>
     
   </footer>
   )
}

export default Footer