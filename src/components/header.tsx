import { auth } from "@/config/auth";
import { FileText } from "lucide-react"
import HeaderDropdown from "./header-dropdown";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

export default async function Header() {
    const session = await auth();

    return (
        <header className="w-full p-5">
            <div className="flex flex-row justify-between items-center">
                <div className="flex items-center justify-center gap-2 mb-3 cursor-pointer">
                    <FileText className="h-6 w-6 mr-1" />
                    <span className="text-lg font-semibold md:text-xl md:font-bold">Invoyce</span>
                </div>
                {session !== null && <div className="invisible md:visible flex flex-row items-center justify-between gap-10">
                    <Link href={"/dashboard"} className={buttonVariants({variant: "ghost"})}>
                        Dashboard
                    </Link>
                    <Link href={"/dashboard/invoices"} className={buttonVariants({variant: "ghost"})}>
                        My Invoices
                    </Link>
                </div>}
                <div>
                    {session !== null ? <HeaderDropdown /> : 
                        <Link href={"/login"} className={`${buttonVariants({variant: "outline"})}`}>
                            Sign In
                        </Link>
                    }
                </div>
            </div>
            
        </header>
    )
}