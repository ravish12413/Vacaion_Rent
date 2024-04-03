import useHostProperties from "@/hooks/useHostProperties";
import { FC } from "react";
import Loading from "./Loading";
import HostPropertyCard from "./HostPropertyCard";
import { ScrollArea } from "./ui/scroll-area"

const HostPropertyList: FC = () => {
    const { properties, loading, err } = useHostProperties();

    return (
        <div className="col-span-2 row-span-2">
            <ScrollArea className="rounded-md h-full overflow-hidden">
                {
                    loading
                        ? <Loading />
                        : err
                            ? <h1>Something went wrong !!!</h1>
                            : properties.map((el) => <HostPropertyCard key={el.id} {...el} />)
                }
            </ScrollArea>
        </div>
    )
}

export default HostPropertyList