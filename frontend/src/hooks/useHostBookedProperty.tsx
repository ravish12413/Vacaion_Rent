import { BookingDataI, ErrorResponse } from "@/shared/types";
import { tokenAtom } from "@/stores/authentication.atom"
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil"
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const useHostBookedProperty = () => {
    const token = useRecoilValue(tokenAtom);
    const [booked, setBooked] = useState<Array<BookingDataI>>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | undefined>(undefined);

    const fetchBookedProperty = useCallback(async () => {
        setLoading(true);
        try {
            const res: AxiosResponse<Array<BookingDataI>> = await axios.get(`${backendServerUrl}booking/host`, {
                headers: {
                    Authorization: token
                }
            })
            setBooked(res.data);
        } catch (er) {
            const errorResponse = er as AxiosError<ErrorResponse>;
            if (errorResponse.response) {
                setErr(errorResponse.response.data.Error);
            } else if (errorResponse.request) {
                setErr("No response received from server.")
            } else {
                setErr("An error occurred while processing the request.")
            }
        } finally {
            setLoading(false);
        }
    }, [token])

    useEffect(() => {
        fetchBookedProperty();
    }, [fetchBookedProperty]);

    return { loading, err, booked }
}

export default useHostBookedProperty