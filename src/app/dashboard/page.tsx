import { requireUser } from "@/hooks/requireUser"

export default async function Dashboard() {
    const session = await requireUser();
    return (
        <div>
            Hello from dashboard page
        </div>
    )
}