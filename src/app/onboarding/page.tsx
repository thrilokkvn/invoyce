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
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="w-sm md:w-md mx-auto">
                <CardHeader>
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
                                <Label>First Name</Label>
                                <Input
                                    name={fields.firstName.name}
                                    key={fields.firstName.key}
                                    defaultValue={fields.firstName.initialValue}
                                    type="text"
                                    placeholder="Sherlock"
                                />
                                <p className="text-red-500 text-sm">{fields.firstName.errors}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Last Name</Label>
                                <Input
                                    name={fields.lastName.name}
                                    key={fields.lastName.key}
                                    defaultValue={fields.lastName.initialValue}
                                    type="text"
                                    placeholder="Holmes"
                                />
                                <p className="text-red-500 text-sm">{fields.lastName.errors}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Address</Label>
                            <Input
                                name={fields.address.name}
                                key={fields.address.key}
                                defaultValue={fields.address.initialValue}
                                type="text"
                                placeholder="221B Baker street"
                            />
                            <p className="text-red-500 text-sm">{fields.address.errors}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-2">
                            <div className="space-y-2">
                                <Label>City</Label>
                                <Input name={fields.city.name} defaultValue={fields.city.initialValue} key={fields.city.key} placeholder="Bangalore" />
                                <p className="text-red-500 text-sm">{fields.city.errors}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Postal Code</Label>
                                <Input name={fields.postalCode.name} defaultValue={fields.postalCode.initialValue} key={fields.postalCode.key} placeholder="111111" />
                                <p className="text-red-500 text-sm">{fields.postalCode.errors}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Country</Label>
                                <Input name={fields.country.name} defaultValue={fields.country.initialValue} key={fields.country.key} placeholder="India" />
                                <p className="text-red-500 text-sm">{fields.country.errors}</p>
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
    );
}
