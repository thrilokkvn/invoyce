import prisma from "@/config/prisma";
import { NextResponse } from "next/server";
import { jsPDF } from 'jspdf';

export async function GET(request: Request, {params}: {params: Promise<{invoiceId: string}>}) {
    const { invoiceId } = (await params);

    const invoiceData = await prisma.invoice.findUnique({
        where: {
            id: invoiceId
        }
    });

    const itemsData = await prisma.invoiceItems.findMany({
        where: {
            invoiceId
        }
    })

    if(!invoiceData || !itemsData) {
        return NextResponse.json({error: 'Invoice not found'}, {status: 404});
    }

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    pdf.setFont("helvetica");

    pdf.setFontSize(24);
    pdf.text(invoiceData.invoiceName, 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Invoice No. INV-${invoiceData.invoiceNumber}`, 20, 27);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("Invoice Date:", 20, 35);
    pdf.setFont("helvetica", "normal");
    pdf.text(invoiceData.invoiceDate.toLocaleDateString(), 50, 35);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("Due Date:", 85, 35);
    pdf.setFont("helvetica", "normal");
    pdf.text(invoiceData.dueDate.toLocaleDateString(), 110, 35);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("From", 20, 50);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text([invoiceData.fromName, invoiceData.fromEmail, invoiceData.fromAddress, `${invoiceData.fromCity}-${invoiceData.fromPostalCode}`, invoiceData.fromCountry], 20, 55)
    
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("Bill To", 70, 50);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text([invoiceData.clientName, invoiceData.clientEmail, invoiceData.clientAddress, `${invoiceData.clientCity}-${invoiceData.clientPostalCode}`, invoiceData.clientCountry], 70, 55)

    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));
    return new NextResponse(pdfBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline"
        }
    })
}