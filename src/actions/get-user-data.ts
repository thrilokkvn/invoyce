"use server";

import prisma from "@/config/prisma";

export async function getUserData(userId: string) {
    const data = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            firstName: true,
            lastName: true,
            address: true,
            city: true,
            postalCode: true,
            country: true,
            email: true
        }
    });

    return data;
}