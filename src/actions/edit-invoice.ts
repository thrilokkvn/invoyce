"use server";

import prisma from "@/config/prisma";
import { requireUser } from "@/hooks/require-user";
import { invoiceSchema } from "@/schema/invoice-schema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export default async function editInvoice(prevState: any, data: FormData) {
    const session = await requireUser();
    const submission = await parseWithZod(data, {schema: invoiceSchema});

    if (submission.status != "success") {
        return submission.reply();
    }

    const totalAmount = submission.value.items.reduce((acc, item) => acc + item.amount, 0);

    await prisma.$transaction(async (txn) => {
        const invoice = await txn.invoice.update({
            where: {
                userId: session.user?.id,
                id: data.get("id") as string
            },
            data: {
                invoiceName: submission.value.invoiceName,
                invoiceNumber: submission.value.invoiceNumber,
                invoiceDate: new Date(submission.value.invoiceDate),
                dueDate: new Date(submission.value.dueDate),
                currency: submission.value.currency,
                fromName: submission.value.from.fromName,
                fromEmail: submission.value.from.fromEmail,
                fromAddress: submission.value.from.fromAddress,
                fromCity: submission.value.from.fromCity,
                fromPostalCode: submission.value.from.fromPostalCode,
                fromCountry: submission.value.from.fromCountry,
                clientName: submission.value.client.clientName,
                clientEmail: submission.value.client.clientEmail,
                clientAddress: submission.value.client.clientAddress,
                clientCity: submission.value.client.clientCity,
                clientPostalCode: submission.value.client.clientPostalCode,
                clientCountry: submission.value.client.clientCountry,
                note: submission.value.note,
                totalAmount: totalAmount
        }});

        await txn.invoiceItems.updateMany({
            where: {
                invoiceId: invoice.id
            },
            data: submission.value.items.map(item => ({
                itemNumber: item.itemNumber,
                description: item.description,
                quantity: item.quantity,
                rate: item.rate,
                amount: item.amount,
            }))
        })
    });

    return redirect("/dashboard/invoices");
}