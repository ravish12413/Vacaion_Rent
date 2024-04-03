import { FC, useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import { Loader2 } from "lucide-react";
import { Role, RoleI } from "@/shared/types";

const Login: FC<RoleI> = ({ role }) => {
    const { credentials, handleChange, handleSubmit, loading } = useLogin(role);
    useEffect(() => {
        role === Role.host ? document.title = "VRP | Host Login" : document.title = "VRP | Guest Login"
    })

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>{role === Role.host ? "Login Host" : "Login Guest"}</CardTitle>
                    <CardDescription>{role === Role.host ? "Login to access host dashboard." : "Login to book a property for vacations."}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={handleChange} name="email" id="email" placeholder="Enter your email" type="email" value={credentials.email} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input onChange={handleChange} name="password" id="password" placeholder="Enter your password" type="password" value={credentials.password} />
                            </div>
                        </div>
                        {
                            loading
                                ? <Button className="w-full my-4" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                </Button>
                                : <Button type="submit" className="w-full my-4">Login</Button>
                        }
                    </form>
                </CardContent>
                <CardFooter className="text-center text mt-[-32px]">
                    {role === Role.host ? "Want to register as a host?" : "Don't have an Account?"}
                    <Link to={role === Role.host ? "/host-register" : "/guest-register"} className="ml-1 text-blue-500">Register</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login