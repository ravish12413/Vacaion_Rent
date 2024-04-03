import { FC } from "react";
import UpdateHost from "./UpdateHost";
import AddNewProperty from "./AddNewProperty";
import HostPropertyList from "./HostPropertyList";
import HostBookedProperty from "./HostBookedProperty";

const HostDashboardMain: FC = () => {

    return (
        <div className="m-2 h-[88vh] grid grid-rows-4 grid-cols-3 gap-4">
            <UpdateHost />
            <AddNewProperty />
            <HostPropertyList />
            <HostBookedProperty />
        </div>
    )
}

export default HostDashboardMain