import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, locationI } from "@/shared/types";
import { useSetRecoilState } from "recoil";
import { locAtom } from "@/stores/location.atom";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const useSearchPage = () => {
    const [startDate, setStartDate] = useState<number | undefined>();
    const [endDate, setEndDate] = useState<number | undefined>();
    const [isStartOpen, setisStartOpen] = useState<boolean>(false);
    const [isEndOpen, setisEndOpen] = useState<boolean>(false);
    const [err, setErr] = useState<string | undefined>(undefined);
    const [availableLoc, setAvailableLoc] = useState<Array<locationI>>([])
    const setLocAtom = useSetRecoilState(locAtom);
    const [loc, setLoc] = useState<string>("");
    const [type, setType] = useState<string>("");
    const navigate = useNavigate();

    const handleSelectChange = useCallback((prop_type: string) => {
        setType(() => prop_type);
    }, [])

    const handleLocChange = useCallback((val: string) => {
        setLoc(() => val)
    }, [])

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!loc) {
            return alert("Please enter a location to search for properties.");
        } else if (!type) {
            return alert("Please select the type of property you are looking for.");
        } else if (!startDate) {
            return alert("Please select the start date for your rental period.");
        } else if (!endDate) {
            return alert("Please select the end date for your rental period.");
        }
        navigate(`/search?loc=${loc}&type=${type}&startDate=${startDate}&endDate=${endDate}&page=1`)
    }, [loc, type, startDate, endDate, navigate])

    const fetchLocation = useCallback(async () => {
        try {
            const res: AxiosResponse<Array<locationI>> = await axios.get(`${backendServerUrl}property/loc`);
            setAvailableLoc(res.data);
            setLocAtom(res.data);
            localStorage.setItem("availableLocations", JSON.stringify(res.data));
        } catch (er) {
            const errorResponse = er as AxiosError<ErrorResponse>;
            if (errorResponse.response) {
                setErr(errorResponse.response.data.Error);
            } else if (errorResponse.request) {
                setErr("No response received from server.")
            } else {
                setErr("An error occurred while processing the request.")
            }
        }
    }, [setLocAtom])

    useEffect(() => {
        fetchLocation();
        console.log(err);
    }, [fetchLocation])

    return { loc, type, startDate, setStartDate, endDate, setEndDate, isStartOpen, setisStartOpen, isEndOpen, setisEndOpen, handleSelectChange, handleLocChange, handleSubmit, availableLoc }
}

export default useSearchPage