import getInvoiceData from "@/actions/get-invoice-data";
import EditInvoice from "@/components/edit-invoice";
import { requireUser } from "@/hooks/require-user";

export default async function EditInvoiceRoute({ params } : {params: Promise<{invoiceId: string}>}) {
    const { invoiceId } = await params;
    const session = await requireUser();
    const invoiceData = await getInvoiceData(invoiceId, session.user?.id as string);

    return (
        <EditInvoice invoiceData={invoiceData}/>
    )
}