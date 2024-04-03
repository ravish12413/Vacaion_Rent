import { FC, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";
import { Role } from "@/shared/types";

const HostRegistration = lazy(() => import("./HostRegister"));
const GuestRegistration = lazy(() => import("./GuestRegister"));
const Login = lazy(() => import("./Login"));
const HostDashboard = lazy(() => import("./HostDashboard"));
const PageNotFound = lazy(() => import("./PageNotFound"));
const PropertyList = lazy(() => import("./PropertyList"));
const Protection = lazy(() => import("../components/ProtectedRoute"));
const SearchPage = lazy(() => import("./Search"));

const Router: FC = () => {
    return (
        <Routes>
            <Route path="/host-register" element={<Suspense fallback={<Loading />}><HostRegistration /></Suspense>} />
            <Route path="/guest-register" element={<Suspense fallback={<Loading />}><GuestRegistration /></Suspense>} />
            <Route path="/host-login" element={<Suspense fallback={<Loading />}><Login role={Role.host} /></Suspense>} />
            <Route path="/guest-login" element={<Suspense fallback={<Loading />}><Login role={Role.guest} /></Suspense>} />
            <Route path="/host-dashboard" element={<Suspense fallback={<Loading />}><Protection role={Role.host}><HostDashboard /></Protection></Suspense>} />
            <Route path="/search" element={<Suspense fallback={<Loading />}><Protection role={Role.guest}><PropertyList /></Protection></Suspense>} />
            <Route path="/" element={<Suspense fallback={<Loading />}><SearchPage /></Suspense>} />
            <Route path="/*" element={<Suspense fallback={<Loading />}><PageNotFound /></Suspense>} />
        </Routes>
    )
}

export default Router