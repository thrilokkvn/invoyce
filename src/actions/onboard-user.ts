"use server";

import prisma from "@/config/prisma";
import { requireUser } from "@/hooks/requireUser";
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
            address: submission.value.address
        }
    })

    return redirect("/dashboard");
}