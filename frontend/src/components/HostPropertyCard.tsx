import { FC } from "react";
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "./ui/card";
import { PropertyI } from "@/shared/types";


const HostPropertyCard: FC<PropertyI> = ({ title, address, city, state, pincode, property_type, img_url }) => {
    return (
        <>
            <Card className="flex my-2 mr-3 min-h-20">
                <CardHeader className="flex flex-row p-4 gap-2 items-center">
                    <img src={img_url} alt={title} className="min-h-full max-h-24 w-20 object-cover" />
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{`${address}, ${city}, ${state}-${pincode}`}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex justify-center items-center p-0">
                    <h4 className="text-sm">{property_type}</h4>
                </CardContent>
            </Card>
        </>
    )
}

export default HostPropertyCard