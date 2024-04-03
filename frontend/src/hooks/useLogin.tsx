import { LoginCredentialsI, Role } from "@/shared/types";
import React, { useCallback, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "@/stores/authentication.atom";
import { useNavigate } from "react-router-dom";

const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const initialState: LoginCredentialsI = {
    email: "",
    password: ""
}

const useLogin = (role: string) => {
    const [credentials, setCredentials] = useState<LoginCredentialsI>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const setToken = useSetRecoilState(tokenAtom);
    const navigate = useNavigate();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        const name: string = event.target.name;
        setCredentials((prev) => ({ ...prev, [name]: val }))
    }, [])

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(() => true);
        try {
            if (role === Role.host) {
                const res: AxiosResponse = await axios.post(`${backendServerUrl}host/signin`, credentials);
                setToken(() => res.data.token);
                localStorage.setItem("token", res.data.token);
                alert("Login Successful")
                navigate("/host-dashboard");
            } else if (role === Role.guest) {
                const res: AxiosResponse = await axios.post(`${backendServerUrl}guest/signin`, credentials);
                setToken(() => res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate("/search");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(() => false);
        }
    }, [credentials, setToken, navigate, role])

    return { credentials, handleChange, handleSubmit, loading }
}

export default useLogin