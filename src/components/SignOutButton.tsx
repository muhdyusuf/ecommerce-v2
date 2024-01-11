'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from './ui/button'
import useCart from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
import { useState } from 'react'
import { AuthError } from '@supabase/supabase-js'
import { Loader2, LogOut } from 'lucide-react'

export default function SignOutButton() {

  const supabase=createClientComponentClient()
  const {cart,removeAllItem}=useCart()
  const router=useRouter()
  const {toast}=useToast()
  const [loading, setLoading] = useState(false)

  async function handleSignOut(){
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if(error) throw error
      removeAllItem()
      router.refresh()
    } catch (error) {
      if(error instanceof AuthError){
         toast({
          variant:"destructive",
          title:"Error sign Out"
        })
      }
    } finally{
      setLoading(false)
    }

  }


  return (

    <Button
      onClick={handleSignOut}
      disabled={loading}
      className='p-1 h-auto text-muted-foreground flex gap-2'
      variant={"outline"}
    >
      {loading?(
        <Loader2 className='animate-spin mr-2'/>
        ):(
        <LogOut size={15}/>
      )}
      sign out
    </Button>

  )
}