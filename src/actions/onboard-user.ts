"use server";

import prisma from "@/config/prisma";
import { requireUser } from "@/hooks/require-user";
import { onboardUserSchema } from "@/schema/onboard-user-schema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function onboardUser(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {schema: onboardUserSchema});
    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
            city: submission.value.city,
            country: submission.value.country,
            postalCode: submission.value.postalCode
        }
    });
    

    return redirect("/dashboard");
}