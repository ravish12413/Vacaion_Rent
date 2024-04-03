import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FC } from "react";
import useUpdateHost from "@/hooks/useUpdateHost"
import { Loader2 } from "lucide-react"

const UpdateHost: FC = () => {
    const { hostDetails, loading, handleChange, handleStatus, handleTextArea, err, handleUpdateSubmit } = useUpdateHost();

    return (
        <Card className="row-span-2 col-span-1">
            <CardHeader className=" pb-4">
                <CardTitle>Update Details</CardTitle>
                <CardDescription>Fill and submit the form to update your details.</CardDescription>
            </CardHeader>
            <form className="px-3" onSubmit={handleUpdateSubmit}>
                <div className="grid grid-rows-2 grid-cols-2 w-full gap-2">
                    <Input onChange={handleChange} value={hostDetails.email} name="email" placeholder="Email" type="email" className="col-span-2 mb-2" />
                    <Input onChange={handleChange} value={hostDetails.name} name="name" placeholder="Name" type="text" />
                    <Select value={hostDetails.status} onValueChange={handleStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Textarea value={hostDetails.about} onChange={handleTextArea} name="about" id="about" className="col-span-2" placeholder="Tell about yourself..." />
                </div>
                {
                    loading
                        ? <Button size={"sm"} className="w-full mt-2" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button> : err ?
                            <Button size={"sm"} className="w-full mt-2" variant={"destructive"} disabled>
                                Something went wrong !!!
                            </Button>
                            : <Button size={"sm"} className="mt-2 w-full">Update</Button>
                }
            </form>
        </Card>
    )
}

export default UpdateHost