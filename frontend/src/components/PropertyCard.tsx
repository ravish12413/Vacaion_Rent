import { PropertyI } from "@/shared/types";
import { FC } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import usePropertyCard from "@/hooks/usePropertyCard";

const PropertyCard: FC<PropertyI> = ({ address, city, id, img_url, pincode, property_type, state, title }) => {
    const { handlebooking } = usePropertyCard(id)

    return (
        <div className="w-[32%]">
            <CardContainer className="w-[100%]">
                <CardBody className="bg-gray-50 relative group/card border-none  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                        translateZ={30}
                        className="text-xl font-bold text-neutral-700 dark:text-white"
                    >
                        {title}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ={30}
                        className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        {`${address}, ${city}, ${state}-${pincode}`}
                    </CardItem>
                    <CardItem translateZ={30} className="w-full mt-4">
                        <img
                            src={img_url}
                            height="1000"
                            width="1000"
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ={30}
                        className="text-lg max-w-sm mt-2 dark:text-neutral-300"
                    >
                        {property_type}
                    </CardItem>
                    <CardItem
                        translateZ={30}
                        as="button"
                        className="mt-4 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-lg font-bold w-full"
                    >
                        <p onClick={handlebooking}>
                            Book Now
                        </p>
                    </CardItem>
                </CardBody>
            </CardContainer>
        </div>
    )
}

export default PropertyCard

