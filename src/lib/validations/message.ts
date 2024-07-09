import { z } from "zod";

//validating a single message
export const messageValidator = z.object({
    id: z.string(),
    senderId: z.string(),
    text: z.string(),
    timestamp: z.number(),
})

//validating the entire array of message
export const messageArrayValidator = z.array(messageValidator)

export type Message = z.infer<typeof messageValidator>