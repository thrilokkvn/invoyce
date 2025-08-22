import InvoiceActions from "@/components/invoice-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Invoices() {
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
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>$1000</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>01-01-2025</TableCell>
                            <TableCell className="text-right"><InvoiceActions /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}