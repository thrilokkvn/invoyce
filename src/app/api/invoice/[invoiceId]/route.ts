import prisma from "@/config/prisma";
import { NextResponse } from "next/server";
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

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

    function formatDate(date: Date): string {
        const day = date.getDate();
        const suffix =
            day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
            day % 10 === 3 && day !== 13 ? "rd" : "th";

        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();

        return `${day}${suffix} ${month}, ${year}`;
    }

    function formatAmount(amount: number, currency: string) {
        if (currency === "INR") {
            return "Rs." + new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 0
            }).format(amount);
        }

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currency,
            currencyDisplay: "symbol",
            maximumFractionDigits: 2
        }).format(amount);
    }


    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.text(invoiceData.invoiceName, 20, 22);


    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(80, 80, 80);
    pdf.text(`Invoice No: INV-${invoiceData.invoiceNumber}`, 20, 32);
    pdf.text(`Date: ${formatDate(invoiceData.invoiceDate)}`, 20, 38);
    pdf.text(`Due: ${formatDate(invoiceData.dueDate)}`, 20, 44);

    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(20, 50, 190, 50);


    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(50, 50, 50);
    pdf.text("Billed By", 20, 60);
    pdf.text("Billed To", 110, 60);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(70, 70, 70);


    pdf.text([
        invoiceData.fromName,
        invoiceData.fromEmail,
        invoiceData.fromAddress,
        `${invoiceData.fromCity} - ${invoiceData.fromPostalCode}`,
        invoiceData.fromCountry
    ], 20, 67);


    pdf.text([
        invoiceData.clientName,
        invoiceData.clientEmail,
        invoiceData.clientAddress,
        `${invoiceData.clientCity} - ${invoiceData.clientPostalCode}`,
        invoiceData.clientCountry
    ], 110, 67);


    pdf.setDrawColor(220, 220, 220);
    pdf.line(20, 100, 190, 100);


    const tableData = itemsData.map((item: any) => {
        const rate = parseFloat(item.rate.toString());
        const itemTotal = item.quantity * rate;

        return [
            item.description,
            item.quantity.toString(),
            formatAmount(rate, invoiceData.currency),
            formatAmount(itemTotal, invoiceData.currency)
        ];
    });

    let subtotal = 0;
    itemsData.forEach(item => {
        const rate = parseFloat(item.rate.toString());
        subtotal += item.quantity * rate;
    });

    const taxRate = 0;
    const taxAmount = subtotal * (taxRate / 100);
    const finalTotal = subtotal + taxAmount;

    autoTable(pdf, {
        head: [['Description', 'Quantity', 'Rate', 'Total']],
        body: tableData,
        startY: 105,
        theme: 'grid',
        headStyles: {
            fillColor: [60, 60, 60],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 10
        },
        bodyStyles: {
            fontSize: 9,
            textColor: [40, 40, 40]
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245]
        },
        columnStyles: {
            0: { cellWidth: 90 },
            1: { cellWidth: 20, halign: 'center' },
            2: { cellWidth: 30, halign: 'right' },
            3: { cellWidth: 30, halign: 'right' }
        },
        margin: { left: 20, right: 20 },
        styles: {
            cellPadding: 3,
            lineColor: [200, 200, 200],
            lineWidth: 0.1
        }
    });

    let finalY = (pdf as any).lastAutoTable.finalY;


    finalY += 10;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);

    const rightEdge = 190;

    pdf.text("Subtotal:", 130, finalY);
    pdf.text(formatAmount(subtotal, invoiceData.currency), rightEdge, finalY, { align: "right" });

    finalY += 6;
    pdf.text("Tax:", 130, finalY);
    pdf.text(formatAmount(taxAmount, invoiceData.currency), rightEdge, finalY, { align: "right" });

    finalY += 6;
    pdf.setDrawColor(50, 50, 50);
    pdf.setLineWidth(0.4);
    pdf.line(130, finalY - 4, rightEdge, finalY - 4);


    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Total:", 130, finalY + 5);
    pdf.text(formatAmount(finalTotal, invoiceData.currency), rightEdge, finalY + 5, { align: "right" });

    if (invoiceData.note) {
        finalY += 20;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.text("Notes", 20, finalY);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        const notesText = pdf.splitTextToSize(invoiceData.note, 160);
        pdf.text(notesText, 20, finalY + 6);
    }

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "italic");
    pdf.setTextColor(100, 100, 100);
    pdf.text("Thank you for your business!", 105, 285, { align: "center" });

    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(180, 180, 180);
    pdf.text("Made with Invoyce", 105, 292, { align: "center" });

    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));
    return new NextResponse(pdfBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline"
        }
    })
}