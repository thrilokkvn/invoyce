import { ArrowRight } from "lucide-react"
import { auth } from "@/config/auth";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";



export default async function Hero() {
    const session = await auth();

    return (
    <BackgroundBeamsWithCollision className="flex flex-col justify-center">
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black font-sans tracking-tight">
       Invoicing is now super easy with{" "}
       <br />
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="block">Invoyce</span>
          </div>
        </div>
      </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create Professional invoices in minutes
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={session ? "/dashboard/invoices/create" : "/login"} className={buttonVariants()}>
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>
    </BackgroundBeamsWithCollision>
  );
}