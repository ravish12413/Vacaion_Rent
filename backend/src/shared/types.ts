export interface HostRegisterI {
    name: string;
    email: string;
    password: string;
    about: string;
}

export interface LoginCredentialsI {
    email: string;
    password: string;
}

export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}


export interface GuestRegisterI {
    name: string;
    email: string;
    password: string;
    gender: Gender;
    dob: Date;
    bio: string;
}

enum PropertyType {
    Apartment = "Apartment",
    House = "House",
    Unique_Homes = "Unique_Homes"
}


export interface PropertyI {
    id: string;
    title: string;
    city: string;
    state: string;
    address: string;
    img_url: string;
    pincode: string;
    property_type: PropertyType;
    host_id: string;
}

export interface PropertyCreateI {
    title: string;
    city: string;
    state: string;
    address: string;
    img_url: string;
    pincode: string;
    property_type: PropertyType;
}

export interface locationI {
    city: string;
    state: string;
}