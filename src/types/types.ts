import { InvoiceStatus, Prisma } from "@prisma/client"

export interface createInvoiceProps {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    postalCode: string,
    country: string
}

export interface itemType {
    id: number,
    invoiceId: string,
    itemNumber: number,
    description: string,
    quantity: number,
    rate: number,
    amount: number
}

export interface completeInvoiceDataProps {
    id: string,
    invoiceName: string,
    invoiceNumber: number,
    invoiceDate: Date,
    dueDate: Date,
    currency: string,
    sendMail: boolean,
    status: "PAID" | "PENDING",
    fromName: string,
    fromEmail: string,
    fromAddress: string,
    fromCity: string,
    fromPostalCode: string,
    fromCountry: string,
    clientName: string,
    clientEmail: string,
    clientAddress: string,
    clientCity: string,
    clientPostalCode: string,
    clientCountry: string,
    totalAmount: number,
    note: string | null,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
    items: itemType[]
}

export interface clientType {
    clientName: string,
    clientEmail: string,
    clientAddress: string,
    clientCity: string,
    clientCountry: string,
    clientPostalCode: string
}

export interface invoicesDataType {
    id: string,
    invoiceNumber: number,
    clientName: string,
    totalAmount: number,
    status: InvoiceStatus,
    createdAt: Date,
    currency: string
}

export type invoiceStatusType = "PAID" | "PENDING";