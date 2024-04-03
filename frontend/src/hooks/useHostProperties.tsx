import { ErrorResponse, PropertyI } from "@/shared/types"
import { tokenAtom } from "@/stores/authentication.atom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const useHostProperties = () => {
    const token = useRecoilValue(tokenAtom);
    const [properties, setProperties] = useState<Array<PropertyI>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string | undefined>(undefined);

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            const res: AxiosResponse = await axios.get(`${backendServerUrl}property/host`, { headers: { Authorization: token } });
            setProperties(res.data)
        } catch (er) {
            const errorResponse = er as AxiosError<ErrorResponse>
            if (errorResponse.response) {
                console.log(errorResponse.response.data.Error);
                setErr(errorResponse.response.data.Error);
            } else if (errorResponse.request) {
                setErr("No response received from server.");
            } else {
                setErr("An error occurred while processing the request.")
            }
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties])

    return { properties, loading, err }
}

export default useHostProperties