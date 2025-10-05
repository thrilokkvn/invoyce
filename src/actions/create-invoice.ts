"use server";

import { emailClient } from "@/config/mailtrap";
import prisma from "@/config/prisma";
import formatCurrency from "@/hooks/format-currency";
import { requireUser } from "@/hooks/require-user";
import { invoiceSchema } from "@/schema/invoice-schema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function createInvoice(prevState: any, data: FormData) {
    const session = await requireUser();
    const submission = parseWithZod(data, {schema: invoiceSchema});

    if (submission.status !== "success") {
        return submission.reply();
    }

    const totalAmount = submission.value.items.reduce((acc, item) => acc + item.amount, 0);

    const sender = {
        email: "hello@invoyce.in",
        name: "Invoyce",
    };

    await prisma.$transaction(async (txn) => {
        const invoice = await txn.invoice.create({
            data: {
                invoiceName: submission.value.invoiceName,
                invoiceNumber: submission.value.invoiceNumber,
                invoiceDate: new Date(submission.value.invoiceDate),
                dueDate: new Date(submission.value.dueDate),
                currency: submission.value.currency,
                sendMail: submission.value.sendMail === 'true',
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
                userId: session.user?.id,
                totalAmount: totalAmount
        }});

        await txn.invoiceItems.createMany({
            data: submission.value.items.map(item => ({
                itemNumber: item.itemNumber,
                description: item.description,
                quantity: item.quantity,
                rate: item.rate,
                amount: item.amount,
                invoiceId: invoice.id
            }))
        })

        if (submission.value.sendMail === 'true') {
            emailClient.send({
                from: sender,
                to: [{email: submission.value.client.clientEmail}],
                template_uuid: process.env.TEMPLATE_ID!,
                template_variables: {
                    "clientName": submission.value.client.clientName,
                    "invoiceNumber": `INV-${submission.value.invoiceNumber}`,
                    "invoiceDate": submission.value.invoiceDate,
                    "dueDate": submission.value.dueDate,
                    "amount": formatCurrency(submission.value.totalAmount, submission.value.currency),
                    "fromName": submission.value.from.fromName,
                    "invoiceLink": process.env.NODE_ENV !== "production" ?
                    `http://localhost:3000/api/invoice/${invoice.id}` : 
                    `https://app.invoyce.in/api/invoice/${invoice.id}`
                }
            });
        }
    });

    return redirect("/dashboard/invoices");
}