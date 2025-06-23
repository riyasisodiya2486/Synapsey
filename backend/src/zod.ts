import {z} from 'zod';

export const authValidation = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(6).max(20)
})