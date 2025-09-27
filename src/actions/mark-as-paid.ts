"use server";

import prisma from "@/config/prisma";
import { requireUser } from "@/hooks/require-user";
import { redirect } from "next/navigation";

export default async function markAsPaid(invoiceId: string) {
    const session = await requireUser();

    const invoiceData = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: session.user?.id
        }
    });

    if (!invoiceData) {
        return redirect("/dashboard/invoices");
    }

    await prisma.invoice.update({
        where: {
            id: invoiceId,
            userId: session.user?.id
        },
        data: {
            status: "PAID"
        }
    });

    return redirect("/dashboard/invoices");
}