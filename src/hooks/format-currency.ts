export default function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency, maximumFractionDigits: currency === "INR" ? 0 : 2 }).format(amount);
}