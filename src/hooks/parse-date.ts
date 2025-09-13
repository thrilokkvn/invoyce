export function safeParseDate (dateValue : any) : Date | undefined {
    if (!dateValue) {
        return undefined;
    }

    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
        return dateValue;
    }

    if (typeof dateValue === 'string') {
        const parsed = new Date(dateValue);
        return !isNaN(parsed.getTime()) ? parsed : undefined;
    }

    return undefined;
}

export function formatDateForSubmission(date?: Date) : string {
    if (!date || isNaN(date.getTime())) return "";

    return date.toISOString().split('T')[0];
}