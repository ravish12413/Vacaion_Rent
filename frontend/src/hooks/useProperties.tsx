import { ErrorResponse, PropertyI, locationI, propertyType } from "@/shared/types";
import { changeAtom } from "@/stores/change.atom";
import { locAtom } from "@/stores/location.atom";
import { queriesAtom } from "@/stores/properties.atom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL

const useProperties = () => {
    const [properties, setProperties] = useState<Array<PropertyI>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>("");
    const setAvailableLoc = useSetRecoilState(locAtom)
    const [searchParams, _] = useSearchParams();
    const [queries, setQueries] = useRecoilState(queriesAtom);
    const changeList = useRecoilValue(changeAtom);

    const fetchProperties = useCallback(async () => {
        setLoading(() => true);
        try {
            const queryParams = Object.entries(queries)
                .filter(([_key, value]) => value !== undefined && value !== 0 && value !== "" && value !== null)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join("&");
            const urlWithQueries = `${backendServerUrl}property/?${queryParams}`
            const res: AxiosResponse<Array<PropertyI>> = await axios.get(`${urlWithQueries}`)
            setProperties(res.data);
        } catch (err) {
            const errorResponse = err as AxiosError<ErrorResponse>;
            if (errorResponse.response) {
                setErr(errorResponse.response.data.Error);
            } else if (errorResponse.request) {
                setErr("No response received from server.")
            } else {
                setErr("An error occurred while processing the request.")
            }
        } finally {
            setLoading(() => false);
        }
    }, [queries])


    const fetchLocation = useCallback(async () => {
        try {
            const res: AxiosResponse<Array<locationI>> = await axios.get(`${backendServerUrl}property/loc`);
            setAvailableLoc(res.data);
            localStorage.setItem("availableLocations", JSON.stringify(res.data));
        } catch (er) {
            console.log(er);
        }
    }, [setAvailableLoc])

    useEffect(() => {
        const propertyList = localStorage.getItem('availableLocations');
        if (propertyList) {
            const parsedLocations = JSON.parse(propertyList);
            setAvailableLoc(parsedLocations);
        } else {
            fetchLocation();
        }
    }, [fetchLocation, setAvailableLoc])

    useEffect(() => {
        const loc = searchParams.get("loc");
        const property_type = searchParams.get("type");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const page = Number(searchParams.get("page"));
        setQueries((prevQueries) => {
            return {
                ...prevQueries,
                location: loc ?? undefined,
                start_date: startDate !== null ? Number(startDate) : undefined,
                end_date: endDate !== null ? Number(endDate) : undefined,
                property_type: property_type as propertyType ?? undefined,
                page: page
            };
        });
    }, [searchParams, setQueries])

    useEffect(() => {
        fetchProperties();
        console.log(err);
    }, [fetchProperties, changeList])

    return { properties, loading }
}

export default useProperties