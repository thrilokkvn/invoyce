"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import {Loader2} from "lucide-react";

export function SubmitButton({text, loadingText, variant}: {text: string, loadingText: string, variant?: 'default' | 'destructive' | 'ghost' | 'outline' | 'secondary' | 'link' | null | undefined}) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? 
            <Button className="w-full" variant={variant} disabled>
                <Loader2 className="size-4 mr-2 animate-spin"/> {loadingText}
            </Button> : 
            <Button type="submit" variant={variant} className="w-full cursor-pointer">
                {text}    
            </Button>}
        </>
    )
}