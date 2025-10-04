import Header from "@/components/header";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "@/config/auth";
import { FileText, Mail } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();

    if (session?.user) {
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Header  />
            <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl  bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg shadow-gray-500/30 ">
                            <FileText className="h-8 w-8 text-black"/>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to manage your invoices</p>
                    </div>

                    <Card className="border-0 shadow-xl shadow-gray-200/50 backdrop-blur">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                            <CardDescription className="text-center">We'll send you a verification link to your email</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                action={async (formData) => {
                                    "use server"
                                    await signIn("nodemailer", formData)
                                }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"/>
                                        <Input name="email" type="email" placeholder="john@example.com" className="pl-10 h-11 border-gray-200" required/>
                                    </div>
                                </div>
                                <SubmitButton text="Send Verification Link" loadingText="Sending..."/>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">No password required • Secure email authentication </p>
                    </div>
                </div>
            </div>
        </div>
    )
}