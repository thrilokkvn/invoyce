import { Badge } from "./ui/badge";

export function StatusBadge({text}: {text: string}) {
    let badgeStyling;

    switch (text) {
        case "PENDING":
            badgeStyling = "bg-yellow-100 text-yellow-400"
            break;
        case "PAID":
            badgeStyling = "bg-green-100 text-green-400"
            break;
        default:
            badgeStyling = "bg-gray-100 text-gray-400"
            break;
    }

    return (
        <Badge className={`${badgeStyling} font-semibold w-20 justify-center`}>
            {text[0]}{text.slice(1).toLowerCase()}
        </Badge>
    )
}