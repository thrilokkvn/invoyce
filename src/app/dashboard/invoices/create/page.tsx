import { getUserData } from "@/actions/get-user-data";
import CreateInvoice from "@/components/create-invoice";
import { requireUser } from "@/hooks/require-user";

export default async function CreateInvoiceRoute() {
    const session = await requireUser();
    const userData = await getUserData(session.user?.id as string);

    return (
        <CreateInvoice 
            firstName={userData?.firstName as string}
            lastName={userData?.lastName as string}
            email={userData?.email as string}
            address={userData?.address as string}
            city={userData?.city as string}
            postalCode={userData?.postalCode as string}
            country={userData?.country as string}
        />
    )
}