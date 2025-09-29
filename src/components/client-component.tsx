"use client";

import { Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import getClients from "@/actions/get-clients";
import { toast } from "sonner";
import { clientType } from "@/types/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";

export default function ClientsComponent() {
    const [clientsData, setClientsData] = useState<clientType[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    useEffect(() => {
        const getClientsData = async() => {
            try {
                const clientData = await getClients();

                if (!clientData) {
                    toast.warning("No clients found!");
                    setClientsData([]);
                } else {
                    setClientsData(clientData);
                }
            } catch (err: any) {
                toast.error("Failed to fetch clients");
            } 
        }

        getClientsData();
    }, []);

    const filteredData = clientsData.filter(each => (each.clientName.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (each.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())));

    return (
        <div>
            <div className="mt-3 flex items-center relative">
                <Input type="search"
                    placeholder="Search your Clients" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-5"/>
                <Search className="absolute top-2 right-2 p-1"/>
            </div>
            {clientsData.length === 0 && <div className="flex flex-col gap-3 justify-center items-center my-5">
                <h1 className="text-xl font-semibold">No clients yet!!</h1>
                <Button onClick={() => router.push("/dashboard/invoices/create")}>
                    <Plus /> Create Invoice    
                </Button>    
            </div>}

            {clientsData.length > 0 && filteredData.length === 0 && <div className="flex flex-col gap-3 justify-center items-center my-5">
                <h1 className="text-xl font-semibold">No clients match your filters</h1>    
            </div>}

            {filteredData.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7 my-5">
                {clientsData.map((each, index) => (
                    <Card key={index} className="border rounded-lg shadow-md p-4">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold">{each.clientName}</h3>
                            <p className="text-gray-600">{each.clientEmail}</p>
                            <p className="text-sm text-gray-500">{each.clientAddress}</p>
                            <p className="text-sm text-gray-500">{each.clientCity}, {each.clientCountry} {each.clientPostalCode}</p>
                        </div>
                    </Card>
                ))}    
            </div>}
        </div>
    )
}