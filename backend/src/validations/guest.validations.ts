import zod from "zod"
import { GuestRegisterI, LoginCredentialsI } from "../shared/types"

export const guestRegisterCredentials = (obj: GuestRegisterI) => {
    const schema = zod.object({
        name: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(8),
        gender: zod.string(),
        dob: zod.coerce.date(),
        bio: zod.string()
    })
    const response = schema.safeParse(obj);
    return response;
}

export const guestLoginCredentials = (obj: LoginCredentialsI) => {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    const response = schema.safeParse(obj);
    return response
}