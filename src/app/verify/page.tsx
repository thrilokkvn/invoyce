import Header from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, MailIcon } from "lucide-react";
import Link from "next/link";

export default function Verify() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Header />
            <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center">
                <Card className="border-0 shadow-xl shadow-gray-200/50 backdrop-blur p-5">
                    <CardHeader className="text-center">
                        <div className="bg-gray-200 rounded-full p-4 mx-auto">
                            <MailIcon className="size-12"/>
                        </div>
                        <CardTitle className="text-2xl font-bold">Check your Email!</CardTitle>
                        <CardDescription>We have sent a verification link to your email <address></address></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-yellow-100 p-3 rounded-sm flex items-center">
                            <AlertCircle className="size-4 mr-2 text-yellow-400"/>
                            <p className="text-yellow-700 text-sm font-medium">Make sure to check your spam folder</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href={"/"} className={buttonVariants({
                            className: "w-full"
                        })}>
                            <ArrowLeft className="size-4 mr-2"/> Back to Home Page
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}