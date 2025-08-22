import { z } from "zod";

export const onboardUserSchema = z.object({
    firstName: z.string().min(2, "First name should be at least 2 characters"),
    lastName: z.string().min(2, "Last name should be at least 2 characters"),
    address: z.string().min(5, "Address should be at least 5 characters"),
})