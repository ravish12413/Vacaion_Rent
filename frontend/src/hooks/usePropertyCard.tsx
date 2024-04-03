import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { queriesAtom } from "@/stores/properties.atom";
import { tokenAtom } from "@/stores/authentication.atom";
import { useCallback, useEffect, useState } from "react";
import { changeAtom } from "@/stores/change.atom";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "@/shared/types";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const usePropertyCard = (id: string) => {
    const queries = useRecoilValue(queriesAtom)
    const [tknAtom, setTokenAtom] = useRecoilState(tokenAtom);
    const setChange = useSetRecoilState(changeAtom)
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string | undefined>(undefined);

    const addBooking = useCallback(async () => {
        setLoading(true)
        try {
            await axios.post(`${backendServerUrl}booking/add-booking`, {
                data: {
                    property_id: id,
                    start_date: queries.start_date,
                    end_date: queries.end_date
                }
            }, {
                headers: { Authorization: tknAtom }
            })
            alert("Booking Confirmed");
        } catch (er) {
            const errorResponse = er as AxiosError<ErrorResponse>;
            if (errorResponse.response) {
                setErr(errorResponse.response.data.Error)
            } else if (errorResponse.request) {
                setErr("No response received from server.")
            } else {
                setErr("An error occurred while processing the request.");
            }
        } finally {
            setLoading(false);
        }
    }, [id, queries.end_date, queries.start_date, tknAtom])

    const handlebooking = useCallback(() => {
        if (!tknAtom) return alert("Login First");
        if (!(id && queries.start_date && queries.end_date && tknAtom)) return alert("Something went wrong!!! Try Again after clearing cache.")
        addBooking()
        if (!err)
            setChange((prev) => prev + 1);
    }, [id, queries.start_date, queries.end_date, tknAtom, setChange, addBooking, err])

    useEffect(() => {
        if (!tknAtom) {
            const token = localStorage.getItem("token");
            token && setTokenAtom(token);
        }
    }, [setTokenAtom, tknAtom])

    return { handlebooking, loading }
}

export default usePropertyCard;