import { hostRegisterCredentialsI } from "@/shared/types";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const initialState: hostRegisterCredentialsI = {
    name: "",
    email: "",
    password: "",
    about: ""
}

const useHostRegister = () => {
    const [credentials, setCredentials] = useState<hostRegisterCredentialsI>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        const name: string = event.target.name;
        setCredentials((prev) => ({ ...prev, [name]: val }))
    }, [])

    const handleTextArea = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val: string = event.target.value;
        setCredentials((prev) => ({ ...prev, about: val }))
    }, [])

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(() => true);
        try {
            await axios.post(`${backendServerUrl}host/signup`, credentials)
            alert("Registration Successful.")
            navigate("/host-login")
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(() => false)
        }
    }, [credentials, navigate])

    return { credentials, loading, handleChange, handleSubmit, handleTextArea }
}

export default useHostRegister