import { ErrorResponse, propertyType } from '@/shared/types';
import { tokenAtom } from '@/stores/authentication.atom';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useState } from "react"
import { useRecoilValue } from 'recoil';
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const useAddProperty = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [pincode, setPincode] = useState<string>("");
    const [img_url, setImg_url] = useState<string>("");
    const [property_type, setpropertyType] = useState<propertyType | "">("");
    const token = useRecoilValue(tokenAtom);

    const handleTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        setTitle(val);
    }, [])

    const handleAddress = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        setAddress(val);
    }, []);
    const handleCity = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        setCity(val);
    }, []);
    const handleState = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        setState(val);
    }, []);
    const handlePincode = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        setPincode(val);
    }, []);
    const handleImg = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        setImg_url(val);
    }, []);

    const handlePropType = useCallback((val: propertyType | "") => {
        setpropertyType(val);
    }, [])

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (!(title && city && state && address && img_url && pincode && property_type)) return alert("Fill all the details to add a property");
        try {
            await axios.post(`${backendServerUrl}property`, {
                data: {
                    title, city, state, address, img_url, pincode, property_type
                }
            }, {
                headers: {
                    Authorization: token
                }
            })
            alert("added");
            setTitle("");
            setAddress("");
            setCity("");
            setState("");
            setPincode("");
            setImg_url("");
            setpropertyType("");
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
                setErr("An error occurred while processing the request.")
            }
        } finally {
            setLoading(false);
        }
    }, [title, city, state, address, img_url, pincode, property_type, token])

    return { loading, err, title, address, city, state, pincode, img_url, property_type, handleAddress, handleCity, handleImg, handlePincode, handleState, handleTitle, handlePropType, handleSubmit }
}

export default useAddProperty