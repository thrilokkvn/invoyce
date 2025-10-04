"use client";

import { onboardUser } from "@/actions/onboard-user";
import { SubmitButton } from "@/components/submit-button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardUserSchema } from "@/schema/onboard-user-schema";
import { FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Onboarding() {
    const [lastResult, action] = useActionState(onboardUser, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: onboardUserSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <Card className="border-0 shadow-xl shadow-gray-200/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-slate-50 to-slate-100">
                                <FileText className="h-5 w-5 text-black"/>
                            </div>
                            <h1 className="font-bold text-lg">Invoyce</h1>
                        </CardTitle>
                        <Separator className="my-2"/>
                        <CardTitle className="text-xl font-bold">
                            You're almost there...
                        </CardTitle>
                        <CardDescription className="font-semibold text-gray-400">
                            Enter your information to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="grid gap-4"
                            action={action}
                            id={form.id}
                            onSubmit={form.onSubmit}
                            noValidate
                        >
                            <div className="grid grid-cols-2 w-full gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label>First Name<span className="text-red-500 font-semibold">*</span></Label>
                                    <Input
                                        name={fields.firstName.name}
                                        key={fields.firstName.key}
                                        defaultValue={fields.firstName.initialValue}
                                        type="text"
                                        placeholder="Sherlock"
                                    />
                                    <p className="text-red-500 text-sm font-semibold">{fields.firstName.errors}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Last Name<span className="text-red-500 font-semibold">*</span></Label>
                                    <Input
                                        name={fields.lastName.name}
                                        key={fields.lastName.key}
                                        defaultValue={fields.lastName.initialValue}
                                        type="text"
                                        placeholder="Holmes"
                                    />
                                    <p className="text-red-500 text-sm font-semibold">{fields.lastName.errors}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Address<span className="text-red-500 font-semibold">*</span></Label>
                                <Input
                                    name={fields.address.name}
                                    key={fields.address.key}
                                    defaultValue={fields.address.initialValue}
                                    type="text"
                                    placeholder="221B Baker street"
                                />
                                <p className="text-red-500 text-sm font-semibold">{fields.address.errors}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-2">
                                <div className="space-y-2">
                                    <Label>City<span className="text-red-500 font-semibold">*</span></Label>
                                    <Input name={fields.city.name} defaultValue={fields.city.initialValue} key={fields.city.key} placeholder="Bangalore" />
                                    <p className="text-red-500 text-sm font-semibold">{fields.city.errors}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Postal Code<span className="text-red-500 font-semibold">*</span></Label>
                                    <Input name={fields.postalCode.name} defaultValue={fields.postalCode.initialValue} key={fields.postalCode.key} placeholder="111111" />
                                    <p className="text-red-500 text-sm font-semibold">{fields.postalCode.errors}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Country<span className="text-red-500 font-semibold">*</span></Label>
                                    <Input name={fields.country.name} defaultValue={fields.country.initialValue} key={fields.country.key} placeholder="India" />
                                    <p className="text-red-500 text-sm font-semibold">{fields.country.errors}</p>
                                </div>
                            </div>

                            <SubmitButton
                                text="Finish Onboarding"
                                loadingText="Finishing..."
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
