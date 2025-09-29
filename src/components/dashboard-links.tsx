"use client";

import { cn } from "@/lib/utils";
import { FileText, HelpCircle, HomeIcon, LayoutDashboard, LineChart, User, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
    {
        id: 0,
        name:"Home",
        href: "/",
        icon: HomeIcon
    },
    {
        id: 1,
        name:"Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    }, {
        id: 2,
        name: "Invoices",
        href: "/dashboard/invoices",
        icon: FileText
    }, {
        id: 3,
        name: "Clients",
        href: "/dashboard/clients",
        icon: Users2
    }, {
        id: 4,
        name: "Profile",
        href: "/dashboard/profile",
        icon: User,
    }, {
        id: 5,
        name: "Help & Support",
        href: "/dashboard/help",
        icon: HelpCircle
    }
]

export function DashboardLinks() {
    const pathname = usePathname();

    return (
        <>
            {sidebarItems.map((link) => (
                <Link className={cn(pathname === link.href
                 ? 'text-primary bg-primary/10' 
                 : 'text-muted-foreground hover:text-foreground',
                 "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary my-1")} href={link.href} key={link.id}>
                    <link.icon className="size-4"/> 
                    {link.name}
                </Link>
            ))}
        </>
    )
}