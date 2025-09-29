import { ArrowRight } from "lucide-react"
import { auth } from "@/config/auth";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default async function Hero() {
    const session = await auth();

    return (
        <div className="py-20 px-4">
            <div className="container mx-auto text-center max-w-4xl">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Invoicing is now super easy with 
                    <span className="block text-primary mt-2">Invoyce</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Create Professional invoices in minutes
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={session ? "/dashboard/invoices/create" : "/login"} className={buttonVariants()}>
                        Start Creating
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}