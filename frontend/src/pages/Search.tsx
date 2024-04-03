"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FC } from "react";
import { format } from "date-fns"
import { Spotlight } from "@/components/ui/Spotlight";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { propertyType } from "@/shared/types"
import useSearchPage from "@/hooks/useSearchPage";


const Search: FC = () => {
    const { loc, type, startDate, setStartDate, endDate, setEndDate, isStartOpen, setisStartOpen, isEndOpen, setisEndOpen, handleSelectChange, handleLocChange, handleSubmit, availableLoc } = useSearchPage();

    return (
        <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    Welcome to the<br /> Vacation Rental Platform
                </h1>
                <div>
                    <Card className="my-20 border-none">
                        <CardHeader>
                            <CardTitle>Filter</CardTitle>
                            <CardDescription>Login to book a property for vacations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-4 w-full items-center gap-4">
                                    <Select value={loc} onValueChange={handleLocChange}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Location..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    availableLoc.length && availableLoc.map((el, i) => (
                                                        <SelectItem key={i} value={`${el.city},${el.state}`}>
                                                            {`${el.city}, ${el.state}`}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Select value={type} onValueChange={handleSelectChange}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Property Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value={propertyType.Apartment}>{propertyType.Apartment}</SelectItem>
                                                <SelectItem value={propertyType.House}>{propertyType.House}</SelectItem>
                                                <SelectItem value={propertyType.Unique_Homes}>{propertyType.Unique_Homes}</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Popover open={isStartOpen} onOpenChange={setisStartOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="h-12">
                                                {startDate ? `${format(startDate, "do-LLL-yyyy")}` : "Start Date"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <Calendar
                                                mode="single"
                                                selected={startDate ? new Date(startDate) : undefined}
                                                onSelect={(date) => { setStartDate(() => date?.getTime()); setisStartOpen(false) }}
                                                className="rounded-md border"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Popover open={isEndOpen} onOpenChange={setisEndOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="h-12">
                                                {endDate ? `${format(endDate, "do-LLL-yyyy")}` : "End Date"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <Calendar
                                                mode="single"
                                                selected={endDate ? new Date(endDate) : undefined}
                                                onSelect={(date) => { setEndDate(() => date?.getTime()); setisEndOpen(false) }}
                                                className="rounded-md border"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <Button type="submit" className="mt-4">Search</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Search