"use server";

import { invoiceSchema } from "@/schema/invoice-schema";
import { parseWithZod } from "@conform-to/zod";

export async function createInvoice(prevState: any, data: FormData) {
    const submission = parseWithZod(data, {schema: invoiceSchema});

    if (submission.status !== "success") {
        return submission.reply();
    }

    // data insertion logic
}