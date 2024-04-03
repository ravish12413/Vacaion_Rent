import zod from "zod"

export const hostRegisterFormSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
    about: zod.string()
})
