"use server";

import prisma from "@/config/prisma";
import { notFound } from "next/navigation";

export default async function getInvoiceData(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        }
    });

    if (!data) {
        return notFound();
    }

    const invoice = {...data, totalAmount: Number(data.totalAmount)}

    const itemsData = await prisma.invoiceItems.findMany({
        where: {
            invoiceId: data?.id
        }
    });

    const items = itemsData.map((item: any) => ({
        id: item.id,
        invoiceId: item.invoiceId,
        itemNumber: item.itemNumber,
        description: item.description,
        quantity: item.quantity,
        rate: Number(item.rate),
        amount: Number(item.amount)
    }));

    const formattedData = {
        ...invoice,
        items
    };

    return formattedData;
}