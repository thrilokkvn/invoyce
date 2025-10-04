import { emailClient } from "@/config/mailtrap";
import prisma from "@/config/prisma";
import formatCurrency from "@/hooks/format-currency";
import { requireUser } from "@/hooks/require-user";
import { NextResponse } from "next/server";

export async function POST(request: Request, {params}: {params: Promise<{invoiceId: string}>}) {
    const { invoiceId } = (await params);
    const session = await requireUser();

    try {
        const invoiceData = await prisma.invoice.findFirst({
            where: {
                id: invoiceId[0],
                userId: session.user?.id
            }
        });

        if (!invoiceData) {
            console.log(invoiceData);
            return NextResponse.json({message: "Invoice not found"}, {status: 404});
        }

        const sender = {
            email: "hello@invoyce.in",
            name: "Invoyce"
        }

        emailClient.send({
            from: sender,
            to: [{email: invoiceData.clientEmail}],
            template_uuid: process.env.REMIND_TEMPLATE_ID!,
            template_variables: {
                "clientName": invoiceData.clientName,
                "invoiceNumber": `INV-${invoiceData.invoiceNumber}`,
                "invoiceDate": invoiceData.invoiceDate.toLocaleDateString(),
                "dueDate": invoiceData.dueDate.toLocaleDateString(),
                "amount": formatCurrency(Number(invoiceData.totalAmount), invoiceData.currency),
                "fromName": invoiceData.fromName,
                "invoiceLink": `http://localhost:3000/api/invoice/${invoiceId}`
            }
        });

        return NextResponse.json({message: "Reminder mail sent!!"}, {status: 200});
    } catch (e) {
        return NextResponse.json({error: "Error sending mail"}, {status: 500})
    }
}