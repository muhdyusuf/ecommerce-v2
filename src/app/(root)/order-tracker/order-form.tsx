'use client'
import { Input } from '@/components/ui/input'
import {FC, useState} from 'react'

import {z} from 'Zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

interface OrderTrackerForm {
 
}
const OrderTrackerSchema=z.object({
    orderId:z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().min(1)
      ),
    email:z.string().email()
})

type IOrderTrackerForm=z.infer<typeof OrderTrackerSchema>

const OrderTrackerForm:FC<OrderTrackerForm>=({})=>{

    const [loading, setLoading] = useState(false)

 
    const form=useForm<IOrderTrackerForm>({
        resolver:zodResolver(OrderTrackerSchema),
        defaultValues:{
          orderId:0,
          email:""
        }
   
      })

    function onSubmit(data:OrderTrackerForm){

    } 


    
 return(
    <Form
        {...form}
        >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4 w-[min(100%,400px)]'
          >
    
          <FormField
            control={form.control}
            name="orderId"
            render={({field}) => (
              <FormItem>
                <FormLabel>Order Id</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Order Id" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email Address" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      

          <Button>
            Track
          </Button>
        


        </form>
       </Form>
)}

export default OrderTrackerForm