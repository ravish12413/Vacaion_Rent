import useHostBookedProperty from "@/hooks/useHostBookedProperty"
import { ScrollArea } from "./ui/scroll-area";
import Loading from "./Loading";
import HostBookedCard from "./HostBookedCard";

const HostBookedProperty = () => {
    const { loading, err, booked } = useHostBookedProperty();

    return (
        <div className="col-span-2 row-span-2">
            <ScrollArea className="rounded-md h-full overflow-hidden">
                {
                    loading
                        ? <Loading />
                        : err
                            ? <h1>Something went wrong !!!</h1>
                            : booked.map((el) => <HostBookedCard key={el.id} {...el} />)
                }
            </ScrollArea>
        </div>
    )
}

export default HostBookedProperty