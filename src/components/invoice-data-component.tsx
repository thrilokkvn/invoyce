"use client";

import { Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { invoicesDataType } from "@/types/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { PuffLoader } from "react-spinners";
import { getInvoices } from "@/actions/get-invoices";
import formatCurrency from "@/hooks/format-currency";
import { StatusBadge } from "./status-badge";
import InvoiceActions from "./invoice-actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

export default function InvoiceDataComponent() {
    const [invoiceData, setInvoiceData] = useState<invoicesDataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const router = useRouter();

    useEffect(() => {
        const getClientsData = async() => {
            try {
                setLoading(true);
                const invoiceData = await getInvoices();

                if (!invoiceData) {
                    toast.warning("No clients found!");
                    setInvoiceData([]);
                } else {
                    setInvoiceData(invoiceData);
                }
            } catch (err: any) {
                toast.error(err.message || "Failed to fetch invoices!");
            } finally {
                setLoading(false);
            }
        }

        getClientsData();
    }, []);

    let filteredData = invoiceData.filter(each => (`INV-${each.invoiceNumber}`.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (each.clientName.toLowerCase().includes(searchQuery.toLowerCase())));
    
    if (statusFilter === "paid" || statusFilter === "pending") {
        filteredData = filteredData.filter(each => each.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (loading) {
        return (
             <div className="min-h-screen flex justify-center items-center">
                <PuffLoader />
            </div>
        )
    }

    return (
        <div>
            {invoiceData.length > 0 && <div className="flex flex-col sm:flex-row justify-start items-stretch sm:items-end gap-3 sm:gap-4">
                <div className="flex-1 w-full">
                    <Label className="block mb-2 text-sm font-medium text-gray-700">Search Invoices</Label>
                    <div className="flex items-center relative w-full">
                        <Input 
                            type="search"
                            placeholder="Search by invoice ID or customer name" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 pl-4 pr-10 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        <Search className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-gray-400"/>
                    </div>
                </div>
                <div className="w-full sm:w-auto sm:min-w-[200px]">
                    <Label className="block mb-2 text-sm font-medium text-gray-700">Invoice Status</Label>
                    <Select onValueChange={(value) => setStatusFilter(value)}>
                        <SelectTrigger className="h-10 w-full border-gray-300 focus-visible:ring-none focus:border-transparent">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="all">All Invoices</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>}

            {!loading && invoiceData.length === 0 && <div className="flex flex-col gap-3 justify-center items-center my-5">
                <h1 className="text-xl font-semibold text-gray-500">No Invoices yet!!</h1>
                <p className="text-gray-500 mb-4 text-center">
                    It looks like you don&apos;t have any Invoices. You can create your first invoice by clicking below.
                </p>
                <Button onClick={() => router.push("/dashboard/invoices/create")}>
                    <Plus /> Create Invoice    
                </Button>    
            </div>}

            {!loading && invoiceData.length > 0 && filteredData.length === 0 && <div className="flex flex-col gap-3 justify-center items-center my-5">
                <h1 className="text-lg font-semibold">No Invoices match your filters</h1>    
            </div>}

            {!loading && filteredData.length > 0 && (
                <div className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-md mt-6 bg-white">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold text-gray-700 py-4">Invoice Id</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Customer</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Amount</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Status</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Date</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map(eachInvoice => (
                                    <TableRow key={eachInvoice.id} className="hover:bg-gray-50 tranisition-colors border-b border-gray-100">
                                        <TableCell className="font-medium text-gray-900 py-2">INV-{eachInvoice.invoiceNumber}</TableCell>
                                        <TableCell className="font-medium text-gray-900 py-2">{eachInvoice.clientName}</TableCell>
                                        <TableCell className="font-medium text-gray-700 py-2">{formatCurrency(Number(eachInvoice.totalAmount), eachInvoice.currency)}</TableCell>
                                        <TableCell className="py-2"><StatusBadge text={eachInvoice.status}/></TableCell>
                                        <TableCell className="text-gray-900 py-2">{eachInvoice.createdAt.toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right py-2"><InvoiceActions invoiceId={eachInvoice.id} status={eachInvoice.status}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    )
}