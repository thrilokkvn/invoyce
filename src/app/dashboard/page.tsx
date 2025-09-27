import DashboardAnalytics from "@/components/dashboard-analytics";
import { Button } from "@/components/ui/button";
import { signOut } from "@/config/auth";
import { requireUser } from "@/hooks/require-user"

export default async function Dashboard() {
    const session = await requireUser();
    return (
        <div>
            <DashboardAnalytics />
        </div>
    )
}