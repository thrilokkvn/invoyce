"use server";

import prisma from "@/config/prisma";
import { redirect } from "next/navigation";

export async function checkUser(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            firstName: true,
            lastName: true,
            address: true
        }
    });

    if (!data?.firstName || !data.lastName || !data.address) {
        redirect("/onboarding");
    }
}