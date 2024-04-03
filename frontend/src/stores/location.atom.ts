import { locationI } from "@/shared/types";
import { atom } from "recoil";

export const locAtom = atom<Array<locationI>>({
    key: "locAtom",
    default: []
})