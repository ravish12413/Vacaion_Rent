import { propertyType, sortByFilter, sortByOrder } from "@/shared/types";
import { changeAtom } from "@/stores/change.atom";
import { locAtom } from "@/stores/location.atom";
import { queriesAtom } from "@/stores/properties.atom"
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

const useFilterSort = () => {
    const [queries, setQueries] = useRecoilState(queriesAtom);
    const [loc, setLoc] = useState<string>("");
    const [host, setHost] = useState<string>("");
    const [pptType, setpptType] = useState<propertyType | null>(null);
    const [sortOrder, setOrder] = useState<sortByOrder | null>(null);
    const [sortFilter, setFilter] = useState<sortByFilter | null>(null);
    const setChange = useSetRecoilState(changeAtom);
    const availableLoc = useRecoilValue(locAtom);


    const handleLoc = useCallback((val: string) => {
        setLoc(val);
    }, [])

    const handleHost = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setHost(event.target.value);
    }, [])

    const handlePpt = useCallback((val: propertyType) => {
        setpptType(val);
    }, []);

    const handleFilter = useCallback((val: sortByFilter) => {
        setFilter(val);
    }, [])

    const handleOrder = useCallback((val: sortByOrder) => {
        setOrder(val);
    }, [])

    const handleSubmit = useCallback(() => {
        setQueries((prevQueries) => {
            return {
                ...prevQueries,
                location: loc ?? undefined,
                property_type: pptType ?? undefined,
                host: host ?? undefined,
                sortByFilter: sortFilter ?? undefined,
                sortByOrder: sortOrder ?? undefined
            }
        })
        setChange((prev) => prev + 1);
    }, [host, loc, pptType, sortFilter, sortOrder, setQueries, setChange])

    useEffect(() => {
        setLoc(queries.location ?? "");
        setHost(queries.host ?? "");
        setpptType(queries.property_type || null);
        setFilter(queries.sortByFilter || null);
        setOrder(queries.sortByOrder || null);
    }, [queries]);

    return { loc, host, pptType, sortOrder, sortFilter, handleLoc, handleHost, handlePpt, handleFilter, handleOrder, handleSubmit, availableLoc };
}

export default useFilterSort;
