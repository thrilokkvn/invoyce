import { Button } from "@/components/ui/button";
import { signOut } from "@/config/auth";
import { requireUser } from "@/hooks/require-user"

export default async function Dashboard() {
    const session = await requireUser();
    return (
        <div>
            Hello from dashboard page
            <Button className="cursor-pointer" onClick={async() => {
                "use server"
                await signOut();
            }}>
                Sign out
            </Button>
        </div>
    )
}