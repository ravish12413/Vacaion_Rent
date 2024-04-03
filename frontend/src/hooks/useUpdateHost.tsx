import { ErrorResponse, HostDetailsI } from "@/shared/types"
import { tokenAtom } from "@/stores/authentication.atom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const initialState: HostDetailsI = {
    name: "",
    email: "",
    about: "",
    status: ""
}

const useUpdateHost = () => {
    const [hostDetails, setHostDetails] = useState<HostDetailsI>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string | undefined>(undefined);
    const token = useRecoilValue(tokenAtom);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setHostDetails((prev) => {
            return { ...prev, [name]: value }
        })
    }, [])

    const handleStatus = useCallback((val: string) => {
        setHostDetails((prev) => {
            return { ...prev, status: val }
        })
    }, [])

    const handleTextArea = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val: string = event.target.value;
        setHostDetails((prev) => ({ ...prev, about: val }))
    }, [])

    const fetchhostDetails = useCallback(async () => {
        setLoading(true);
        try {
            const res: AxiosResponse = await axios.get(`${backendServerUrl}host`, {
                headers: {
                    Authorization: token
                }
            })
            setHostDetails(res.data);
        } catch (err) {
            const errorResponse = err as AxiosError<ErrorResponse>;
            if (errorResponse.response) {
                console.log(errorResponse.response.data.Error);
                setErr(errorResponse.response.data.Error);
                setTimeout(() => {
                    setErr("");
                }, 2500);
            } else if (errorResponse.request) {
                setErr("No response received from server.")
            } else {
                setErr("An error occurred while processing the request");
            }
        } finally {
            setLoading(false);
        }
    }, [token])

    const handleUpdateSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res: AxiosResponse = await axios.patch(`${backendServerUrl}host/update-host`, { data: hostDetails }, {
                headers: {
                    Authorization: token
                }
            })
            alert("Details Updated");
            setHostDetails(res.data.data);
        } catch (er) {
            console.log(er);
        } finally {
            setLoading(false);
        }
    }, [hostDetails, token]);

    useEffect(() => {
        fetchhostDetails()
    }, [fetchhostDetails]);

    return { hostDetails, loading, handleChange, handleStatus, handleTextArea, err, handleUpdateSubmit };
}

export default useUpdateHost