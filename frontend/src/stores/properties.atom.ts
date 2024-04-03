import { queriesI } from "@/shared/types";
import { atom } from "recoil";

const initialState: queriesI = {
    sortByFilter: undefined,
    sortByOrder: undefined,
    location: "",
    property_type: undefined,
    host: "",
    end_date: 0,
    start_date: 0
}

export const queriesAtom = atom<queriesI>({
    key: "queriesAtom",
    default: initialState
})