import {z} from "zod"

export const signUpSchema=z.object({
    email:z.string().email(),
    password:
        z.string()
        .min(8)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            {
              message:
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
            }
        ),
    confirmPassword:z.string().min(8)
}).refine(val=>val.password===val.confirmPassword,{
    message:"password don't match",
    path:["confirmPassword"]
})

export const signInSchema=z.object({
    email:z.string().email()
}) 
