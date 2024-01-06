import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req:NextRequest) {
    const res=NextResponse.next()
    const supabase=createMiddlewareClient({req,res})

      const {data:{user}}=await supabase.auth.getUser()
      
    
    if(user&&req.nextUrl.pathname==="/signIn"){
        console.log("redirect by middleWare")
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)
    }
    

    return res
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
  }