"use server";

import prisma from "@/config/prisma";
import { requireUser } from "@/hooks/require-user";

export default async function getDashboardData() {
    const session = await requireUser();

    const [amountData, openInvoices, paidInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where: {
                userId: session.user?.id
            }, 
            select: {
                totalAmount: true,
                currency: true
            }
        }),

        prisma.invoice.findMany({
            where: {
                userId: session.user?.id,
                status: 'PENDING'
            }, 
            select: {
                id: true
            }
        }),

        prisma.invoice.findMany({
            where: {
                userId: session.user?.id,
                status: 'PAID'
            }, 
            select: {
                id: true
            }
        })
    ]);

    return {amountData, openInvoices, paidInvoices};
}