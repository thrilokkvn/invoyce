import DashboardAnalytics from "@/components/dashboard-analytics";
import { requireUser } from "@/hooks/require-user"

export default async function Dashboard() {
    await requireUser();
    
    return (
        <div>
            <DashboardAnalytics />
        </div>
    )
}