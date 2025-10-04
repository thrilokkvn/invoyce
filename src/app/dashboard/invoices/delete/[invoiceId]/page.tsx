import { deleteInvoice } from "@/actions/delete-invoice";
import { SubmitButton } from "@/components/submit-button";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/config/prisma";
import formatCurrency from "@/hooks/format-currency";
import { formatDateForSubmission } from "@/hooks/parse-date";
import { requireUser } from "@/hooks/require-user";
import { ArrowLeft, AlertTriangle, Calendar, User, DollarSign, FileText, Hash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function authorizeUser(invoiceId: string, userId: string) {
    if (!invoiceId || !userId) {
        redirect("/dashboard/invoices");
    }

    const invoiceData = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        }
    });

    if (!invoiceData) {
        redirect("/dashboard/invoices");
    }

    return invoiceData;
}

export default async function DeleteInvoice({params} : {params : Promise<{invoiceId: string}>}) {
    const { invoiceId } = await params;
    const session = await requireUser();

    const invoiceData = await authorizeUser(invoiceId, session.user?.id as string);

    return (
        <div className="min-h-screen p-4 flex items-center justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center space-y-4 pb-6">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Delete Invoice Confirmation
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
                        Are you sure you want to delete invoice{" "}
                        <span className="font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                            INV-{invoiceData.invoiceNumber}
                        </span>
                        ?
                    </CardDescription>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
                        <strong>Warning:</strong> This action cannot be undone. The invoice will be permanently removed from your account.
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Invoice Details
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Hash className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Invoice Number</p>
                                        <p className="text-base font-semibold text-gray-900">INV-{invoiceData.invoiceNumber}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Invoice Name</p>
                                        <p className="text-base font-semibold text-gray-900">{invoiceData.invoiceName}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <User className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Client Name</p>
                                        <p className="text-base font-semibold text-gray-900">{invoiceData.clientName}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Invoice Date</p>
                                        <p className="text-base font-semibold text-gray-900">{formatDateForSubmission(invoiceData.invoiceDate)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Due Date</p>
                                        <p className="text-base font-semibold text-gray-900">{formatDateForSubmission(invoiceData.dueDate)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <DollarSign className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Amount</p>
                                        <p className="text-lg font-bold text-green-600">
                                            {formatCurrency(Number(invoiceData.totalAmount), invoiceData.currency)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-6">
                    <Link className={buttonVariants({variant: 'outline'})} href="/dashboard/invoices">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Link>
                    <form action={async() => {
                        "use server";
                        await deleteInvoice(invoiceId);
                    }}>
                        <SubmitButton text="Delete Invoice" loadingText="Deleting..." variant={"destructive"}/>
                    </form>
                </CardFooter>
            </Card>        
        </div>
    )
}