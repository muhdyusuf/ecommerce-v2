import { getUserDetails } from "@/app/supabase-server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";
import prisma from "../../../../../prisma/client";

export async function GET(request:NextRequest) {
 
    const {searchParams,origin}=new URL(request.url)
    const code=searchParams.get('code')
    const next = searchParams.get('next') ?? '/'
    const cookieStore=cookies()
  
    if(code){
        const supabase=createRouteHandlerClient({cookies:()=>cookieStore})
        await supabase.auth.exchangeCodeForSession(code)

        const { data: {user} } = await supabase.auth.getUser()
        console.log(user)
    
        if(user){
            await prisma.user.upsert({
                where:{
                    email:user.email
                },
                update:{},
                create:{
                    email:user.email!,
                    username:user.user_metadata.user_name,
                }
            })
        }
            
    }
    return NextResponse.redirect(new URL(next,origin))
    
}