import FilterAndSort from "@/components/FilterAndSort";
import Navbar from "@/components/Navbar";
import Properties from "@/components/Properties";
import { FC } from "react";


const PropertyList: FC = () => {

    return (
        <>
            <Navbar />
            <FilterAndSort />
            <Properties />
        </>
    )
}

export default PropertyList