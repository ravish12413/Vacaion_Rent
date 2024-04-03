import HostDashboardMain from "@/components/HostDashboardMain";
import Navbar from "@/components/Navbar";
import { tokenAtom } from "@/stores/authentication.atom";
import { FC, useEffect } from "react";
import { useRecoilState } from "recoil";

const HostDashboard: FC = () => {
    const [token, setToken] = useRecoilState(tokenAtom)
    useEffect(() => {
        document.title = "VRP | Host Dashboard"
        if (!token) {
            const tkn = localStorage.getItem("token");
            tkn && setToken(tkn)
        }
    })
    return (
        <>
            <Navbar />
            <HostDashboardMain />
        </>
    )
}

export default HostDashboard