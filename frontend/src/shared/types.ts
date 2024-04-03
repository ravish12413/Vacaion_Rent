import { ReactNode } from "react";

export interface childrenPropI {
    children: ReactNode
}

export interface LoginCredentialsI {
    email: string;
    password: string;
}

export enum Role {
    guest = "guest",
    host = "host"
}

export interface RoleI {
    role: Role
}

export interface hostRegisterCredentialsI {
    name: string;
    email: string;
    password: string;
    about: string;
}

export enum sortByOrder {
    ASCENDING = "ASCENDING",
    DESCENDING = "DESCENDING"
}

export enum sortByFilter {
    LOCATION = "LOCATION",
    PROPERTY_TYPE = "PROPERTY_TYPE"
}

export enum propertyType {
    Apartment = "Apartment",
    House = "House",
    Unique_Homes = "Unique_Homes"
}

export interface queriesI {
    sortByOrder?: sortByOrder;
    sortByFilter?: sortByFilter;
    host?: string;
    location?: string;
    property_type?: propertyType;
    start_date?: number;
    end_date?: number;
    page?: number;
}

export interface PropertyI {
    title: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    property_type: propertyType;
    host_id: string;
    id: string;
    img_url: string;
}

export interface ErrorResponse {
    Error: string;
}

export interface HostDetailsI {
    name: string;
    email: string;
    about: string;
    status: string;
}

export interface locationI {
    city: string;
    state: string;
}

export interface guestRegisterCredentialsI {
    name: string;
    email: string;
    password: string;
    bio: string;
    dob: number;
    gender: string;
}

export interface BookingDataI {
    end_date: string;
    guest_id: string;
    id: string;
    property: {
        address: string;
        city: string;
        host_id: string;
        id: string;
        img_url: string;
        pincode: string;
        property_type: string;
        state: string;
        title: string;
    };
    property_id: string;
    start_date: string;
}