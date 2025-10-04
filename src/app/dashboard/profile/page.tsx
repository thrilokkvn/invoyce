import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, MapPin, User } from "lucide-react";

export default function Profile() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Card className="flex flex-col justify-center items-center">
                    <CardHeader>
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white hover:bg-gray-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-gray-100 p-3 rounded-lg">
                                            <User className="h-6 w-6 text-gray-800" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 mb-1">Full Name</p>
                                            <p className="text-lg font-semibold text-gray-900">John Doe</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white hover:bg-gray-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-gray-100 p-3 rounded-lg">
                                            <Mail className="h-6 w-6 text-gray-800" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                                            <p className="text-lg font-semibold text-gray-900">john@example.com</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white hover:bg-gray-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-gray-100 p-3 rounded-lg">
                                            <MapPin className="h-6 w-6 text-gray-800" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                                            <p className="text-lg font-semibold text-gray-900">Address</p>
                                            <p className="text-sm text-gray-600 mt-1">City, Country • PostalCode</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white hover:bg-gray-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-gray-100 p-3 rounded-lg">
                                            <Calendar className="h-6 w-6 text-gray-800" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 mb-1">Member Since</p>
                                            <p className="text-lg font-semibold text-gray-900">January 2024</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}