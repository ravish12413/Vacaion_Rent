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
import { Textarea } from "@/components/ui/textarea"
import { Link } from "react-router-dom";
import useHostRegister from "@/hooks/useHostRegister";
import { Loader2 } from "lucide-react";

const HostRegister: FC = () => {
    const { credentials, loading, handleChange, handleSubmit, handleTextArea } = useHostRegister();

    useEffect(() => {
        document.title = "VRP | Host Register"
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Register as Host</CardTitle>
                    <CardDescription>Register as host to rent your property.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input value={credentials.name} onChange={handleChange} name="name" id="name" placeholder="Enter your name" type="text" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input value={credentials.email} onChange={handleChange} name="email" id="email" placeholder="Enter your email" type="email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input value={credentials.password} onChange={handleChange} name="password" id="password" placeholder="Enter your password" type="password" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="about">About yourself</Label>
                                <Textarea value={credentials.about} onChange={handleTextArea} name="about" id="about" placeholder="Tell about yourself..." />
                            </div>
                        </div>
                        {
                            loading
                                ? <Button className="w-full my-4" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                </Button>
                                : <Button type="submit" className="w-full my-4">Register</Button>
                        }
                    </form>
                </CardContent>
                <CardFooter className="text-center text mt-[-32px]">
                    Already have an account?
                    <Link to="/host-login" className="ml-1 text-blue-500">Login</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default HostRegister
