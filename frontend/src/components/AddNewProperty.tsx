import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FC } from "react";
import { propertyType } from "@/shared/types";
import useAddProperty from "@/hooks/useAddProperty";
import { Loader2 } from "lucide-react";

const AddNewProperty: FC = () => {
    const { loading, err, title, address, city, state, pincode, img_url, property_type, handleAddress, handleCity, handleImg, handlePincode, handleState, handleTitle, handlePropType, handleSubmit } = useAddProperty();

    return (
        <Card className="row-span-2 row-start-3 col-span-1">
            <CardHeader className="p-2 pl-4 pt-4">
                <CardTitle>Add Property</CardTitle>
            </CardHeader>
            <form className="px-3" onSubmit={handleSubmit}>
                <div className="grid grid-rows-2 grid-cols-2 w-full gap-2">
                    <Input value={title ?? ""} onChange={handleTitle} name="Title" placeholder="Title" type="text" className="col-span-2" />
                    <Input value={address ?? ""} onChange={handleAddress} name="Address" placeholder="Address" type="text" />
                    <Input value={city ?? ""} onChange={handleCity} name="city" placeholder="City" type="text" />
                    <Input value={state ?? ""} onChange={handleState} name="state" placeholder="State" type="text" />
                    <Input value={pincode ?? ""} onChange={handlePincode} name="pincode" placeholder="Pincode" type="text" />
                    <Input value={img_url ?? ""} onChange={handleImg} name="img_url" placeholder="Image URL" type="text" className="col-span-2" />
                    <Select value={property_type} onValueChange={handlePropType}>
                        <SelectTrigger className="col-span-2">
                            <SelectValue placeholder="Property Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={propertyType.Apartment}>{propertyType.Apartment}</SelectItem>
                                <SelectItem value={propertyType.House}>{propertyType.House}</SelectItem>
                                <SelectItem value={propertyType.Unique_Homes}>{propertyType.Unique_Homes}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {
                    loading
                        ? <Button size={"sm"} className="w-full mt-2" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button> : err ?
                            <Button size={"sm"} className="w-full mt-2" variant={"destructive"} disabled>
                                Something went wrong !!!
                            </Button> :
                            <Button type="submit" size={"sm"} className="mt-2 w-full">Add Property</Button>
                }
            </form>
        </Card >
    )
}

export default AddNewProperty