import { CheckCircleIcon, DownloadCloud, Edit, Ellipsis, MailIcon, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";

export default function InvoiceActions({ invoiceId }: {invoiceId : string}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${invoiceId}`}>
                        <Edit /> Edit Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${invoiceId}`} target="_blank">
                        <DownloadCloud /> Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <MailIcon /> Reminder Mail
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <CheckCircleIcon /> Mark as Paid
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <Trash /> Delete Invoice
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}