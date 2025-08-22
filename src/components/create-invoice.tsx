import { CalendarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function CreateInvoice() {
    return (
        <div>
            <h2 className="text-2xl font-bold">Create Your Invoice</h2>
            <Card className="mt-4">
                <CardHeader>
                    <div className="flex gap-3">
                        <Badge variant={"outline"}>Draft</Badge>
                        <Input placeholder="Test 123" className="w-md"/>
                    </div>

                    <h2 className="font-bold mt-4">Invoice Details</h2>
                    <div className="grid grid-cols-3 gap-3 mt-2 items-center">
                        <div className="space-y-2">
                            <Label>Invoice No.</Label>
                            <div className="flex">
                                <span className="flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md font-medium">
                                    #
                                </span>
                                <Input 
                                    className="rounded-l-none border-slate-300 focus-visible:ring-0 focus-visible:border-slate-400" 
                                    placeholder="12345"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Currency</Label>
                            <Select defaultValue="INR">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Your Currency"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                                    <SelectItem value="USD">United States Dollar (USD)</SelectItem>
                                    <SelectItem value="EUR">European Dollar (EUR)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-2 items-center">
                        <div className="space-y-2">
                            <Label>Invoice Date</Label>
                            <Popover>
                                <PopoverTrigger className="w-full" asChild>
                                    <Button variant={"outline"} className="w-full">
                                        <CalendarIcon /> Pick a Date
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar />
                                </PopoverContent>
                            </Popover>
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Due Date</Label>
                            <Popover>
                                <PopoverTrigger className="w-full" asChild>
                                    <Button variant={"outline"} className="w-full">
                                        <CalendarIcon /> Pick a Date
                                    </Button>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <h1 className="font-bold mb-4">From</h1>
                            <div className="space-y-2 mb-2">
                                <Label>Name/Company</Label>
                                <Input placeholder="Your Name or Company Name"/>
                            </div>
                            <div className="space-y-2 mb-2">
                                <Label>Email</Label>
                                <Input placeholder="Your Email"/>
                            </div>
                            <div className="space-y-2 mb-2">
                                <Label>Address</Label>
                                <Input placeholder="Address"/>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-2">
                                <div className="space-y-2">
                                    <Label>City</Label>
                                    <Input placeholder="Bangalore"/>
                                </div>
                                <div className="space-y-2">
                                    <Label>Postal Code</Label>
                                    <Input placeholder="111111"/>
                                </div>
                                <div className="space-y-2">
                                    <Label>Country</Label>
                                    <Input placeholder="India"/>
                                </div>
                            </div>
                        </div>

                        <div className="pl-5 border-l border-gray-200">
                            <h1 className="font-bold mb-4">To</h1>
                            <div className="space-y-2 mb-2">
                                <Label>Name/Company</Label>
                                <Input placeholder="Your Name or Company Name"/>
                            </div>
                            <div className="space-y-2 mb-2">
                                <Label>Email</Label>
                                <Input placeholder="Your Email"/>
                            </div>
                            <div className="space-y-2 mb-2">
                                <Label>Address</Label>
                                <Input placeholder="Address"/>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-2">
                                <div className="space-y-2">
                                    <Label>City</Label>
                                    <Input placeholder="Bangalore"/>
                                </div>
                                <div className="space-y-2">
                                    <Label>Postal Code</Label>
                                    <Input placeholder="111111"/>
                                </div>
                                <div className="space-y-2">
                                    <Label>Country</Label>
                                    <Input placeholder="India"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}