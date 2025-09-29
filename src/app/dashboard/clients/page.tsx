import ClientsComponent from "@/components/client-component";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function Clients() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Clients</CardTitle>
                <CardDescription className="font-semibold">View clients of your organization</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientsComponent />
            </CardContent>
        </Card>
    )
}