"use server";

import prisma from "@/config/prisma";
import { requireUser } from "@/hooks/require-user";

export default async function getClients() {
    const session = await requireUser();

    const clientData = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id
        }, 
        select: {
            clientName: true,
            clientEmail: true,
            clientAddress: true,
            clientCity: true,
            clientCountry: true,
            clientPostalCode: true
        },
        
    });

    if (!clientData) return null;

    return clientData;
}