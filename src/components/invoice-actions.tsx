"use client";

import { CheckCircleIcon, DownloadCloud, Edit, Ellipsis, MailIcon, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import axios from 'axios';
import { InvoiceStatus } from "@prisma/client";

export default function InvoiceActions({ invoiceId, status }: {invoiceId : string, status: InvoiceStatus}) {
    const handleReminderEmail = () => {
        toast.promise(
            axios.post(`/api/remind/${invoiceId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }), {
                loading: "Sending reminder mail...",
                success: "Reminder Email sent successfully!",
                error: "Failed to send Reminder email"
            }
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {status === "PENDING" && <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${invoiceId}`}>
                        <Edit /> Edit Invoice
                    </Link>
                </DropdownMenuItem>}
                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${invoiceId}`} target="_blank">
                        <DownloadCloud /> Download Invoice
                    </Link>
                </DropdownMenuItem>
                {status === "PENDING" && <DropdownMenuItem onClick={handleReminderEmail}>
                    <MailIcon /> Send Reminder Mail
                </DropdownMenuItem>}
                {status === "PENDING" && <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/update/${invoiceId}`}>
                        <CheckCircleIcon /> Mark as Paid
                    </Link>
                </DropdownMenuItem>}
                <DropdownMenuItem className="text-red-400 hover:text-red-400" asChild>
                    <Link href={`/dashboard/invoices/delete/${invoiceId}`}>
                        <Trash className="text-red-400"/> Delete Invoice
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}