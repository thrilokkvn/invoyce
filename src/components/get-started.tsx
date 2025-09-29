import { ArrowRight } from "lucide-react"
import { buttonVariants } from "./ui/button"
import Link from "next/link"
import { auth } from "@/config/auth";

export default async function GetStarted (){
    const session = await auth();

    return (
        <div className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your First Invoice?
          </h2>
          <p className="mb-8 text-lg">
            Join thousands of businesses who trust <span className="font-semibold">Invoyce</span> for their billing needs.
          </p>
            <Link href={session ? "/dashboard/invoices/create" : "/login"} className={buttonVariants()}>
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>
      </div>
    )
}