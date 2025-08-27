import z from "zod";

export const invoiceSchema = z.object({
    invoiceName: z.string().min(3, "Invoice name is required"),
    invoiceNumber: z.coerce.number().min(1, "Invoice number is required"),

    invoiceDate: z.string().min(1, "Invoice date is required"),
    dueDate: z.string().min(1, "Due date is required"),
    currency: z.string().min(1, "Currency is required"),

    from : z.object({
        fromName: z.string().min(3, "From name is required"),
        fromEmail: z.string().email("Invalid email").min(1, "From email is required"),
        fromAddress: z.string().min(5, "From address is required"),
        fromCity: z.string().min(2, "From city is required"),
        fromPostalCode: z.string().min(2, "From postal code is required"),
        fromCountry: z.string().min(2, "From country is required"),
    }),

    client: z.object({
        clientName: z.string().min(3, "Client name is required"),
        clientEmail: z.string().email("Invalid email").min(1, "Client email is required"),
        clientAddress: z.string().min(5, "Client address is required"),
        clientCity: z.string().min(2, "Client city is required"),
        clientPostalCode: z.string().min(2, "Client postal code is required"),
        clientCountry: z.string().min(2, "Client country is required"),
    }),

    items: z.array(z.object({
        itemNumber: z.coerce.number().min(1, "Item number is required"),
        description: z.string().min(3, "Item description is required"),
        quantity: z.coerce.number().min(1, "Item quantity is required"),
        rate: z.coerce.number().min(1, "Item rate is required"),
        amount: z.coerce.number().min(1, "Item amount is required"),
    })).min(1, "At least one item is required"),

    totalAmount: z.coerce.number().min(1, "Total amount is required"),
    note: z.string().optional()
})