import { atom } from "recoil";

export const changeAtom = atom<number>({
    key: "changeAtom",
    default: 0
})