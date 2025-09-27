"use server";

import prisma from "@/config/prisma";
import { requireUser } from "@/hooks/require-user";
import { redirect } from "next/navigation";

export async function deleteInvoice(invoiceId: string) {
    const session = await requireUser();

    await prisma.invoice.delete({
        where: {
            id: invoiceId,
            userId: session.user?.id
        }
    });

    return redirect("/dashboard/invoices");
}