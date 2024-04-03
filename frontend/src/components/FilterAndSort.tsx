import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FC } from "react";
import { propertyType, sortByFilter, sortByOrder } from "@/shared/types";
import useFilterSort from "@/hooks/useFilterSort";

const FilterAndSort: FC = () => {
    const { loc, host, pptType, sortOrder, sortFilter, handleLoc, handleHost, handlePpt, handleFilter, handleOrder, handleSubmit, availableLoc } = useFilterSort();

    return (
        <div className={`flex items-start justify-center flex-col gap-4 p-4 rounded-lg w-[80%] mx-auto my-2`} >
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Filter
            </h3>
            <div className="flex gap-4 justify-between w-full">
                <Select value={loc ?? ""} onValueChange={handleLoc}>
                    <SelectTrigger className="h-12 w-60">
                        <SelectValue placeholder="Location..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                availableLoc.length && availableLoc.map((el, i) => (
                                    <SelectItem key={i} value={`${el.city},${el.state}`}>
                                        {`${el.city}, ${el.state}`}
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input type="text" className="h-12 w-80" placeholder="Host" value={host} onChange={handleHost} />
                <Select value={pptType ?? ""} onValueChange={handlePpt}>
                    <SelectTrigger className="w-[180px] h-12">
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
                <Select value={sortFilter ?? ""} onValueChange={handleFilter}>
                    <SelectTrigger className="w-[180px] h-12">
                        <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={sortByFilter.LOCATION}>{sortByFilter.LOCATION}</SelectItem>
                            <SelectItem value={sortByFilter.PROPERTY_TYPE}>{sortByFilter.PROPERTY_TYPE}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={sortOrder ?? ""} onValueChange={handleOrder}>
                    <SelectTrigger className="w-[180px] h-12">
                        <SelectValue placeholder="Sort by order" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={sortByOrder.ASCENDING}>{sortByOrder.ASCENDING}</SelectItem>
                            <SelectItem value={sortByOrder.DESCENDING}>{sortByOrder.DESCENDING}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Button className={"text-lg flex justify-center items-center"} variant={"outline"} onClick={handleSubmit}>
                Filter
            </Button>
        </div>
    );
};

export default FilterAndSort