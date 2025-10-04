"use server";

import prisma from "@/config/prisma";
import { requireUser } from "@/hooks/require-user";

export async function getInvoices() {
    const session = await requireUser();
    
    const invoiceData = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id
        },
        select: {
            id: true,
            invoiceNumber: true,
            clientName: true,
            totalAmount: true,
            status: true,
            createdAt: true,
            currency: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return invoiceData.map(invoice => ({
        ...invoice,
        totalAmount: invoice.totalAmount.toNumber(),
    }));
}