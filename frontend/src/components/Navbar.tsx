import { FC } from "react";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useLogout from "@/hooks/useLogout";

const Navbar: FC = () => {
    const { token, handleLogoutClick } = useLogout();
    return (
        <nav className="py-4 border-b bottom-1">
            <div className="flex justify-between items-center px-10">
                <div className="flex-shrink-0">
                    <Link to="/" className="font-bold text-xl">Vacation Rental Platform</Link>
                </div>
                <div className="flex items-center gap-4">
                    {
                        token ?
                            <Button variant={"destructive"} onClick={handleLogoutClick}>Logout</Button>
                            : <><Button variant={"secondary"} asChild><Link to={"/guest-login"}>Login</Link></Button>
                                <Button variant={"secondary"} asChild><Link to={"/host-login"}>Host Login</Link></Button></>
                    }
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar