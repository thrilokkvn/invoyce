import { User2 } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/config/auth";

export default function HeaderDropdown() {
    return (
        <div className="flex items-center ml-auto">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="rounded-full cursor-pointer" variant={"outline"} size={"icon"}>
                        <User2 />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={"/dashboard/invoices"}>Invoices</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <form className="w-full" action={async() => {
                            "use server"
                            await signOut();
                        }}>
                            <button className="w-full text-left cursor-pointer text-red-400 font-semibold">Logout</button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}