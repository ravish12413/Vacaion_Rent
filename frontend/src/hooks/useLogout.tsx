import { tokenAtom } from "@/stores/authentication.atom"
import { useCallback } from "react";
import { useRecoilState } from "recoil"

const useLogout = () => {
    const [token, setToken] = useRecoilState(tokenAtom);

    const handleLogoutClick = useCallback(() => {
        localStorage.removeItem("token");
        setToken(() => "");
    }, [setToken]);

    return { token, handleLogoutClick }
}

export default useLogout