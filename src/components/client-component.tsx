"use client";

import { Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import getClients from "@/actions/get-clients";
import { toast } from "sonner";
import { clientType } from "@/types/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { PuffLoader } from "react-spinners"

export default function ClientsComponent() {
    const [clientsData, setClientsData] = useState<clientType[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    useEffect(() => {
        const getClientsData = async() => {
            try {
                setLoading(true);
                const clientData = await getClients();

                if (!clientData) {
                    toast.warning("No clients found!");
                    setClientsData([]);
                } else {
                    setClientsData(clientData);
                }
            } catch (err: any) {
                toast.error(err.message || "Failed to fetch clients");
            } finally {
                setLoading(false);
            }
        }

        getClientsData();
    }, []);

    const uniqueClients = clientsData.filter((value, index, self) => 
        index === self.findIndex(t => 
            JSON.stringify(t) === JSON.stringify(value)
        )
    );

    const filteredData = uniqueClients.filter(each => (each.clientName.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (each.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())));

    if (loading) {
        return (
             <div className="min-h-screen flex justify-center items-center">
                <PuffLoader />
            </div>
        )
    }

    return (
        <div>
            {clientsData.length >0 && <div className="mt-3 flex items-center relative">
                <Input type="search"
                    placeholder="Search your Clients" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-5"/>
                <Search className="absolute top-2 right-2 p-1"/>
            </div>}

            {!loading && clientsData.length === 0 && <div className="flex flex-col gap-3 justify-center items-center my-5">
                <h1 className="text-xl font-semibold text-gray-500">No clients yet!!</h1>
                <p className="text-gray-500 mb-4 text-center">
                    It looks like you don&apos;t have any clients. You can create your first invoice by clicking below.
                </p>
                <Button onClick={() => router.push("/dashboard/invoices/create")}>
                    <Plus /> Create Invoice    
                </Button>    
            </div>}

            {!loading && clientsData.length > 0 && filteredData.length === 0 && <div className="flex flex-col gap-3 justify-center items-center my-5">
                <h1 className="text-lg font-semibold text-gray-500">No clients match your filters</h1>    
            </div>}

            {!loading && filteredData.length > 0 && (
                <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm mt-4">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 hover:bg-gray-50">
                                    <TableHead className="font-semibold text-gray-900">S.No.</TableHead>
                                    <TableHead className="font-semibold text-gray-900">Client/Company Name</TableHead>
                                    <TableHead className="font-semibold text-gray-900">Email</TableHead>
                                    <TableHead className="font-semibold text-gray-900">Address</TableHead>
                                    <TableHead className="font-semibold text-gray-900">City</TableHead>
                                    <TableHead className="font-semibold text-gray-900">Country</TableHead>
                                    <TableHead className="font-semibold text-gray-900 text-right">Postal Code</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((each, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                                        <TableCell className="font-medium text-gray-900">{index + 1}</TableCell>
                                        <TableCell className="font-medium text-gray-900">{each.clientName}</TableCell>
                                        <TableCell className="text-gray-600">{each.clientEmail}</TableCell>
                                        <TableCell className="text-gray-600 max-w-xs truncate">{each.clientAddress}</TableCell>
                                        <TableCell className="text-gray-600">{each.clientCity}</TableCell>
                                        <TableCell className="text-gray-600">{each.clientCountry}</TableCell>
                                        <TableCell className="text-gray-600 text-right">{each.clientPostalCode}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    )
}