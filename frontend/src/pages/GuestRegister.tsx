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
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useGuestRegister from "@/hooks/useGuestRegister";

const GuestRegister: FC = () => {
    const { credentials, loading, handleChange, handleSubmit, handleTextArea, isStartOpen, setisStartOpen, handleDOB, handleGender } = useGuestRegister();

    useEffect(() => {
        document.title = "VRP | Guest Register"
    }, [])

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>Register as Guest</CardTitle>
                    <CardDescription>Register as host to rent property.</CardDescription>
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
                                <Label htmlFor="password">Date of Birth</Label>
                                {/* <Input value={credentials.password} onChange={handleChange} name="password" id="password" placeholder="Enter your password" type="password" /> */}
                                <Popover open={isStartOpen} onOpenChange={setisStartOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">
                                            {credentials.dob ? `${format(credentials.dob, "do-LLL-yyyy")}` : "Start Date"}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <Calendar
                                            mode="single"
                                            selected={credentials.dob ? new Date(credentials.dob) : undefined}
                                            onSelect={(val) => { val && handleDOB(val.toString()); setisStartOpen(false) }}
                                            className="rounded-md border"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="about">Gender</Label>
                                {/* <Textarea value={credentials.about} onChange={handleTextArea} name="about" id="about" placeholder="Tell about yourself..." /> */}
                                <Select value={credentials.gender} onValueChange={handleGender}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Property Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={"Male"}>{"Male"}</SelectItem>
                                            <SelectItem value={"Female"}>{"Female"}</SelectItem>
                                            <SelectItem value={"Other"}>{"Other"}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="about">About yourself</Label>
                                <Textarea value={credentials.bio} onChange={handleTextArea} name="about" id="about" placeholder="Tell about yourself..." />
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
                    <Link to="/guest-login" className="ml-1 text-blue-500">Login</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default GuestRegister
