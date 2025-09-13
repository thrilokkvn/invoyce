import { getInvoices } from "@/actions/get-invoices";
import InvoiceActions from "@/components/invoice-actions";
import { StatusBadge } from "@/components/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import formatCurrency from "@/hooks/format-currency";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Invoices() {
    const invoiceData = await getInvoices();

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-2xl font-bold">My Invoices</CardTitle>
                    <CardDescription className="font-semibold">Manage your invoices at one place</CardDescription>
                </div>
                <Link href="/dashboard/invoices/create" className={buttonVariants()}>
                    <Plus /> Create Invoice
                </Link>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice Id</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoiceData.map(eachInvoice => (
                            <TableRow key={eachInvoice.id}>
                                <TableCell>INV-{eachInvoice.invoiceNumber}</TableCell>
                                <TableCell>{eachInvoice.clientName}</TableCell>
                                <TableCell>{formatCurrency(Number(eachInvoice.totalAmount), eachInvoice.currency)}</TableCell>
                                <TableCell><StatusBadge text={eachInvoice.status}/></TableCell>
                                <TableCell>{eachInvoice.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell className="text-right"><InvoiceActions invoiceId={eachInvoice.id}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}