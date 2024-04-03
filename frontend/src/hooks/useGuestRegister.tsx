import { guestRegisterCredentialsI } from "@/shared/types";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const initialState: guestRegisterCredentialsI = {
    name: "",
    email: "",
    password: "",
    bio: "",
    gender: "",
    dob: 0
}

const useGuestRegister = () => {
    const [credentials, setCredentials] = useState<guestRegisterCredentialsI>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [isStartOpen, setisStartOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        const name: string = event.target.name;
        setCredentials((prev) => ({ ...prev, [name]: val }))
    }, [])

    const handleTextArea = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val: string = event.target.value;
        setCredentials((prev) => ({ ...prev, bio: val }))
    }, [])

    const handleDOB = useCallback((val: string) => {
        setCredentials((prev) => ({ ...prev, dob: new Date(val).getTime() }))
    }, [])

    const handleGender = useCallback((val: string) => {
        setCredentials((prev) => ({ ...prev, gender: val }))
    }, [])

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(() => true);
        try {
            if (!(credentials.name && credentials.dob && credentials.bio && credentials.email && credentials.gender && credentials.password)) return alert("Fill all details.")
            await axios.post(`${backendServerUrl}guest/signup`, credentials)
            alert("Registration Successful.")
            navigate("/guest-login")
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(() => false)
        }
    }, [credentials, navigate])

    return { credentials, loading, handleChange, handleSubmit, handleTextArea, isStartOpen, setisStartOpen, handleDOB, handleGender }
}

export default useGuestRegister