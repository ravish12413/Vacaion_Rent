import { useRecoilValue } from "recoil";
import { Role, childrenPropI } from "../shared/types";
import { Navigate } from "react-router-dom";
import { FC } from "react";
import { tokenAtom } from "../stores/authentication.atom";

interface newChildI extends childrenPropI {
    role: string;
}

const ProtectedRoute: FC<newChildI> = ({ role, children }) => {
    let token: string | null = useRecoilValue<string>(tokenAtom);
    if (!token) {
        token = localStorage.getItem("token");
    }
    if (role === Role.host)
        return token ? children : <Navigate to={"/host-login"} />
    else
        return children;
}

export default ProtectedRoute