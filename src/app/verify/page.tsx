import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, MailIcon } from "lucide-react";
import Link from "next/link";

export default function Verify() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Card>
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
    )
}