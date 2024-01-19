import {z} from 'zod'

export const filterSchema=z.object({
    rating:z.number().optional(),
    priceRange:z.object({
        minPrice:z.number().optional(),
        maxPrice:z.number().optional(),
    }).refine(data=>{
        if(data.maxPrice==undefined&&data.minPrice==undefined)return true
        if(!data?.maxPrice||!data?.minPrice)return false
        return (data.maxPrice>data.minPrice)
    },{
        message:"range is invalid",
    }).optional()
})

export const sortBySchema=z.string().refine((value) => {
    return ['priceAsc', 'priceDesc', 'ratingAsc', 'ratingDesc', 'relevant'].includes(value);
  }, {
    message: 'Invalid sort value. Must be "priceAsc", "priceDesc", "ratingAsc", "ratingDesc", or "relevant"',
});