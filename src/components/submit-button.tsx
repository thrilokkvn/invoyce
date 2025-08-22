"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import {Loader2} from "lucide-react";

export function SubmitButton({text, loadingText}: {text: string, loadingText: string}) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? 
            <Button className="w-full" disabled>
                <Loader2 className="size-4 mr-2 animate-spin"/> {loadingText}
            </Button> : 
            <Button type="submit" className="w-full cursor-pointer">
                {text}    
            </Button>}
        </>
    )
}