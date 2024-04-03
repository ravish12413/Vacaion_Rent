import { FC } from "react";
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "./ui/card";
import { BookingDataI } from "@/shared/types";
import { format } from "date-fns"

const HostBookedCard: FC<BookingDataI> = ({ start_date, end_date, property }) => {
    return (
        <>
            <Card className="flex my-2 mr-3 min-h-20">
                <CardHeader className="flex flex-row p-4 gap-2 items-center">
                    <img src={property.img_url} alt={property.title} className="min-h-full max-h-24 w-20 object-cover" />
                    <div className="w-40 overflow-auto">
                        <CardTitle className="text-lg">{property.title}</CardTitle>
                        <CardDescription>{`${property.address}, ${property.city}, ${property.state}-${property.pincode}`}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex justify-center items-start p-0 flex-col">
                    <h4 className="text-sm">From: {format(start_date, "do-LLL-yyyy")}</h4>
                    <h4 className="text-sm">Till: {format(end_date, "do-LLL-yyyy")}</h4>
                </CardContent>
            </Card>
        </>
    )
}

export default HostBookedCard