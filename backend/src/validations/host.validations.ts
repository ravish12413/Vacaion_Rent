import zod from "zod"
import { HostRegisterI, LoginCredentialsI } from "../shared/types"

export const hostRegisterCredentials = (obj: HostRegisterI) => {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8),
        name: zod.string(),
        about: zod.string()
    })
    const response = schema.safeParse(obj);
    return response;
}

export const hostLoginCredentials = (obj: LoginCredentialsI) => {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    const response = schema.safeParse(obj);
    return response
}