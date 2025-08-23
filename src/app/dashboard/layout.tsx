import { checkUser } from "@/actions/check-user";
import { DashboardLinks } from "@/components/dashboard-links";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "@/config/auth";
import { requireUser } from "@/hooks/require-user";
import { FileText, MenuIcon, User2, Users2 } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default async function DashboardLayout({children}: {children: ReactNode}) {
    const session = await requireUser();
    const data = await checkUser(session.user?.id as string)

    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex flex-col max-h-screen h-full gap-2">
                        <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href={"/"} className="flex items-center gap-2">
                                <FileText className="size-7" />
                                <span className="text-2xl font-bold">Invoyce</span>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <DashboardLinks />
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={"outline"} size={"icon"} className="md:hidden">
                                    <MenuIcon className="size-5"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="grid gap-2 mt-10">
                                    <DashboardLinks />
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <div className="flex items-center ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full" variant={"outline"} size={"icon"}>
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
                    </header>

                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}