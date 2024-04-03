import { FC } from "react";
import useProperties from "../hooks/useProperties";
import PropertyCard from "./PropertyCard";
import Loading from "./Loading";
import NoPropertyFound from "./NoPropertyFound";

const Properties: FC = () => {
  const { properties, loading } = useProperties();
  return (
    <div className="mx-auto w-[80%] gap-2 flex justify-between flex-wrap px-4">
      {
        loading ? <Loading /> :
          properties.length === 0 ? <NoPropertyFound /> :
            properties.map((el, i) => <PropertyCard key={i} {...el} />)
      }
    </div>
  )
}

export default Properties