import zod from "zod";
import { PropertyCreateI } from "../shared/types";

export const propertyCreationValidation = (obj: PropertyCreateI) => {
    const schema = zod.object({
        title: zod.string(),
        city: zod.string(),
        state: zod.string(),
        address: zod.string(),
        img_url: zod.string().url(),
        pincode: zod.string().max(6).min(6),
        property_type: zod.string()
    })
    const response = schema.safeParse(obj);
    return response;
}