import ClientCartList from '@/components/ClientCartList'
import { FC } from 'react'

interface pageProps {
  searchParams:{

  },
  params:string
}

const page: FC<pageProps> = ({searchParams,params}) => {
  const isSignedIn=false


  return (
  <>
    {!isSignedIn?(
    <main>
      <ClientCartList/>
    </main>
    ):(
    <main>
      <ul>
        {}
      </ul>

    </main>
    )}
   <section>

   </section>
  </>
  )
}

export default page