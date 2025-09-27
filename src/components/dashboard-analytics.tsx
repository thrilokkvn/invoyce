import getDashboardData from "@/actions/get-dashboard-data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, FileText, CheckCircle, Clock } from "lucide-react";
import formatCurrency from "@/hooks/format-currency";

export default async function DashboardAnalytics() {
    const {amountData, openInvoices, paidInvoices} = await getDashboardData();

    const processedData = amountData.reduce((acc:any, item) => {
        const existing = acc.find((each : any) => each.currency === item.currency);
        if (existing) {
            existing.totalAmount = Number(existing.totalAmount) + Number(item.totalAmount);
        } else {
            acc.push({...item, totalAmount: Number(item.totalAmount)})
        }

        return acc;
    }, [])
    .sort((a: any, b: any) => b.totalAmount - a.totalAmount);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-700 mb-2 uppercase">Invoyce Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 space-y-4">
                        <Card className="shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    TOTAL INVOICES
                                </CardTitle>
                                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="text-3xl font-bold text-blue-600">
                                    {amountData.length}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Total Invoices issued
                                </p>
                            </CardContent>
                        </Card>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card className="shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        PAID INVOICES
                                    </CardTitle>
                                    <div className="h-8 w-8 bg-green-50 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-3xl font-bold text-green-600">
                                        {paidInvoices.length}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Successfully collected payments
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        OPEN INVOICES
                                    </CardTitle>
                                    <div className="h-8 w-8 bg-orange-50 rounded-lg flex items-center justify-center">
                                        <Clock className="h-4 w-4 text-orange-600" />
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-3xl font-bold text-orange-600">
                                        {openInvoices.length}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Invoices awaiting payment
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="lg:col-span-7 flex">
                        <Card className="bg-white border border-gray-200 shadow-sm flex-1">
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <DollarSign className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-gray-500">
                                        REVENUE BY CURRENCY
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {processedData.length > 0 ? (
                                    <div className="space-y-3">
                                        {processedData.map((item: any, index: number) => (
                                            <div 
                                                key={`${item.currency}-${index}`}
                                                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 bg-green-100 border border-gray-200 rounded-lg flex items-center justify-center">
                                                        <span className="text-xs font-semibold text-gray-700 uppercase">
                                                            {item.currency}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-semibold text-gray-900">
                                                            {formatCurrency(item.totalAmount, item.currency)}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Total revenue in {item.currency.toUpperCase()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="h-6 w-6 bg-green-100 text-green-700 rounded-md flex items-center justify-center">
                                                    {formatCurrency(item.totalAmount, item.currency)[0]}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <DollarSign className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Revenue Data</h3>
                                        <p className="text-gray-500 max-w-sm mx-auto">
                                            Create and send invoices to start tracking your revenue by currency
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}