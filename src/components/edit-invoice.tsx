"use client";

import { CalendarIcon, PlusIcon, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "@/schema/invoice-schema";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./submit-button";
import formatCurrency from "@/hooks/format-currency";
import { completeInvoiceDataProps } from "@/types/types"
import editInvoice from "@/actions/edit-invoice";
import { formatDateForSubmission, safeParseDate } from "@/hooks/parse-date";
import { Checkbox } from "./ui/checkbox";

export default function EditInvoice({ invoiceData } : {invoiceData: completeInvoiceDataProps}) {
    const [lastResult, action] = useActionState(editInvoice, undefined);

    const initialInvoiceDate = safeParseDate(invoiceData.invoiceDate);
    const initialDueDate = safeParseDate(invoiceData.dueDate);

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            console.log("Form data: ", formData)
            return parseWithZod(formData, { schema: invoiceSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
        defaultValue: {
            invoiceName: invoiceData.invoiceName,
            invoiceNumber: invoiceData.invoiceNumber,
            invoiceDate: formatDateForSubmission(initialInvoiceDate),
            dueDate: formatDateForSubmission(initialDueDate),
            currency: invoiceData.currency,

            sendMail: invoiceData.sendMail ? "true" : "false",

            from: {
                fromName: invoiceData.fromName,
                fromEmail: invoiceData.fromEmail,
                fromAddress: invoiceData.fromAddress,
                fromCity: invoiceData.fromCity,
                fromPostalCode: invoiceData.fromPostalCode,
                fromCountry: invoiceData.fromCountry,
            },

            client: {
                clientName: invoiceData.clientName,
                clientEmail: invoiceData.clientEmail,
                clientAddress: invoiceData.clientAddress,
                clientCity: invoiceData.clientCity,
                clientPostalCode: invoiceData.clientPostalCode,
                clientCountry: invoiceData.clientCountry,
            },

            items: [...invoiceData.items],

            totalAmount: invoiceData.totalAmount.toString(),
            note: invoiceData.note,
        }
    });

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialInvoiceDate);
    const [dueDate, setDueDate] = useState<Date | undefined>(initialDueDate);

    const [currency, setCurrency] = useState(fields.currency.initialValue ?? "");

    const calculateAmount = (quantity: string, rate: string) => {
        const amount = ((Number(rate) || 0) * (Number(quantity) || 0));
        return formatCurrency(amount, currency)
    }
    const calculateTotalAmount = fields.items.getFieldList().reduce((acc, itemField) => {
        const item = itemField.getFieldset();
        const rate = Number(item.rate.value) || 0;
        const quantity = Number(item.quantity.value) || 0;

        return acc + (rate * quantity);
    }, 0);

    const formatDate = (date?: Date) => date && !isNaN(date.getTime()) ? date.toLocaleDateString("en-CA") : "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <div>
            <h2 className="text-2xl font-bold">Edit Invoice</h2>
            <Card className="mt-4">
                <form className="space-y-3" id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardHeader>
                        <div className="flex gap-3">
                            <Badge variant={"outline"}>Draft</Badge>
                            <div>
                                <Label className="mb-1">Invoice Name</Label>
                                <Input name={fields.invoiceName.name} defaultValue={fields.invoiceName.initialValue} key={fields.invoiceName.key} placeholder="Test 123" className="w-md" />
                                <p className="text-red-500 text-sm">{fields.invoiceName.errors}</p>
                            </div>
                            <input type="hidden" name="id" value={invoiceData.id}/>
                        </div>

                        <h2 className="font-bold mt-4">Invoice Details</h2>
                        <div className="grid grid-cols-3 gap-3 mt-2 items-center">
                            <div className="space-y-2">
                                <Label>Invoice No.</Label>
                                <div className="flex">
                                    <span className="flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md font-medium">
                                        INV-
                                    </span>
                                    <Input
                                        name={fields.invoiceNumber.name}
                                        defaultValue={fields.invoiceNumber.initialValue}
                                        key={fields.invoiceNumber.key}
                                        className="rounded-l-none border-slate-300 focus-visible:ring-0 focus-visible:border-slate-400"
                                        placeholder="12345"
                                    />
                                </div>
                                <p className="text-red-500 text-sm">{fields.invoiceNumber.errors}</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Currency</Label>
                                <Select name={fields.currency.name} defaultValue={fields.currency.initialValue} key={fields.currency.key} onValueChange={(val) => {
                                    setCurrency(val);
                                    form.update({name: fields.currency.name, value: val})
                                }}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Your Currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                                        <SelectItem value="USD">United States Dollar (USD)</SelectItem>
                                        <SelectItem value="EUR">European Dollar (EUR)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-red-500 text-sm">{fields.currency.errors}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-2 items-center">
                            <div className="space-y-2">
                                <Label>Invoice Date</Label>
                                <Popover>
                                    <PopoverTrigger className="w-full" asChild>
                                        <Button type="button" variant={"outline"} className="w-full">
                                            <CalendarIcon /> {selectedDate ? selectedDate.toLocaleDateString() : "Pick a Date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar mode={"single"} selected={selectedDate} onSelect={(date) => setSelectedDate(date ?? undefined)} disabled={(date) => date < today} />
                                    </PopoverContent>
                                </Popover>
                                <input type="hidden" name={fields.invoiceDate.name} value={formatDate(selectedDate)}/>
                                <p className="text-red-500 text-sm">{fields.invoiceDate.errors}</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Due Date</Label>
                                <Popover>
                                    <PopoverTrigger className="w-full" asChild>
                                        <Button type="button" variant={"outline"} className="w-full">
                                            <CalendarIcon /> {dueDate ? dueDate.toLocaleDateString() : "Pick a Date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar mode={"single"} selected={dueDate} onSelect={(date) => setDueDate(date ?? undefined)} disabled={(date) => date < (selectedDate ?? today)} />
                                    </PopoverContent>
                                </Popover>
                                <input type="hidden" name={fields.dueDate.name} value={formatDate(dueDate)}/>
                                <p className="text-red-500 text-sm">{fields.dueDate.errors}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <h1 className="font-bold mb-4">From</h1>
                                <div className="space-y-2 mb-2">
                                    <Label>Name/Company</Label>
                                    <Input name={fields.from.getFieldset().fromName.name} defaultValue={fields.from.getFieldset().fromName.initialValue} key={fields.from.getFieldset().fromName.key} placeholder="Your Name or Company Name" />
                                    <p className="text-red-500 text-sm">{fields.from.getFieldset().fromName.errors}</p>
                                </div>
                                <div className="flex flex-col justify-start">
                                    <div className="space-y-2 mb-2">
                                        <Label>Email</Label>
                                        <Input name={fields.from.getFieldset().fromEmail.name} defaultValue={fields.from.getFieldset().fromEmail.initialValue} key={fields.from.getFieldset().fromEmail.key} placeholder="Your Email" />
                                        <p className="text-red-500 text-sm">{fields.from.getFieldset().fromEmail.errors}</p>
                                    </div>
                                    <div className="invisible flex items-center gap-2 mb-2">
                                        <Checkbox />
                                        <Label>Send mail to client</Label>
                                    </div>
                                </div>
                                <div className="space-y-2 mb-2">
                                    <Label>Address</Label>
                                    <Input name={fields.from.getFieldset().fromAddress.name} defaultValue={fields.from.getFieldset().fromAddress.initialValue} key={fields.from.getFieldset().fromAddress.key} placeholder="Address" />
                                    <p className="text-red-500 text-sm">{fields.from.getFieldset().fromAddress.errors}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-2">
                                    <div className="space-y-2">
                                        <Label>City</Label>
                                        <Input name={fields.from.getFieldset().fromCity.name} defaultValue={fields.from.getFieldset().fromCity.initialValue} key={fields.from.getFieldset().fromCity.key} placeholder="Bangalore" />
                                        <p className="text-red-500 text-sm">{fields.from.getFieldset().fromCity.errors}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Postal Code</Label>
                                        <Input name={fields.from.getFieldset().fromPostalCode.name} defaultValue={fields.from.getFieldset().fromPostalCode.initialValue} key={fields.from.getFieldset().fromPostalCode.key} placeholder="111111" />
                                        <p className="text-red-500 text-sm">{fields.from.getFieldset().fromPostalCode.errors}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Country</Label>
                                        <Input name={fields.from.getFieldset().fromCountry.name} defaultValue={fields.from.getFieldset().fromCountry.initialValue} key={fields.from.getFieldset().fromCountry.key} placeholder="India" />
                                        <p className="text-red-500 text-sm">{fields.from.getFieldset().fromCountry.errors}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pl-5 border-l border-gray-200 ml-0">
                                <h1 className="font-bold mb-4">To</h1>
                                <div className="space-y-2 mb-2">
                                    <Label>Name/Company</Label>
                                    <Input name={fields.client.getFieldset().clientName.name} defaultValue={fields.client.getFieldset().clientName.initialValue} key={fields.client.getFieldset().clientName.key} placeholder="Your Name or Company Name" />
                                    <p className="text-red-500 text-sm">{fields.client.getFieldset().clientName.errors}</p>
                                </div>
                                <div className="flex flex-col justify-start">
                                    <div className="space-y-2 mb-1">
                                        <Label>Email</Label>
                                        <Input name={fields.client.getFieldset().clientEmail.name} defaultValue={fields.client.getFieldset().clientEmail.initialValue} key={fields.client.getFieldset().clientEmail.key} placeholder="Your Email" />
                                        <p className="text-red-500 text-sm">{fields.client.getFieldset().clientEmail.errors}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Checkbox name={fields.sendMail.name} key={fields.sendMail.key} defaultChecked={fields.sendMail.initialValue === "true"} value="true"/>
                                        <Label>Send mail to client</Label>
                                    </div>
                                </div>
                                <div className="space-y-2 mb-2">
                                    <Label>Address</Label>
                                    <Input name={fields.client.getFieldset().clientAddress.name} defaultValue={fields.client.getFieldset().clientAddress.initialValue} key={fields.client.getFieldset().clientAddress.key} placeholder="Address" />
                                    <p className="text-red-500 text-sm">{fields.client.getFieldset().clientAddress.errors}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-2">
                                    <div className="space-y-2">
                                        <Label>City</Label>
                                        <Input name={fields.client.getFieldset().clientCity.name} defaultValue={fields.client.getFieldset().clientCity.initialValue} key={fields.client.getFieldset().clientCity.key} placeholder="Bangalore" />
                                        <p className="text-red-500 text-sm">{fields.client.getFieldset().clientCity.errors}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Postal Code</Label>
                                        <Input name={fields.client.getFieldset().clientPostalCode.name} defaultValue={fields.client.getFieldset().clientPostalCode.initialValue} key={fields.client.getFieldset().clientPostalCode.key} placeholder="111111" />
                                        <p className="text-red-500 text-sm">{fields.client.getFieldset().clientPostalCode.errors}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Country</Label>
                                        <Input name={fields.client.getFieldset().clientCountry.name} defaultValue={fields.client.getFieldset().clientCountry.initialValue} key={fields.client.getFieldset().clientCountry.key} placeholder="India" />
                                        <p className="text-red-500 text-sm">{fields.client.getFieldset().clientCountry.errors}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="flex justify-between items-center space-y-2">
                                <h2 className="font-bold mt-4">Item Details</h2>
                                <Button className="cursor-pointer" variant={"outline"}
                                    {...form.insert.getButtonProps({
                                        name: fields.items.name,
                                        defaultValue: {
                                            description: "",
                                            quantity: 1,
                                            rate: 0,
                                            amount: 0,
                                        },
                                    })}
                                >
                                    <PlusIcon /> Add Item
                                </Button>
                            </div>

                            <Card className="w-full py-2">
                                {fields.items.getFieldList().map((item, index) => (
                                    <div key={item.key} className="px-4">
                                        {(index !== 0) && <Separator />}
                                        <div className="flex items-center justify-between my-3">
                                            <div className="text-sm font-medium mb-2">
                                                Item Number: {index + 1}
                                                <input type="hidden" name={item.getFieldset().itemNumber.name} value={index + 1} key={item.getFieldset().itemNumber.key}/>
                                            </div>
                                            {fields.items.getFieldList().length > 1 && <Button variant={"ghost"} size={"sm"}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                                                {...form.remove.getButtonProps({
                                                    name: fields.items.name,
                                                    index,
                                                })}>
                                                <Trash2 />
                                            </Button>}
                                        </div>
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 space-y-2">
                                                <Label>Description</Label>
                                                <Input name={item.getFieldset().description.name} defaultValue={item.getFieldset().description.initialValue} key={item.getFieldset().description.key} placeholder="Description of Item" />
                                                <p className="text-red-500 text-sm">{item.getFieldset().description.errors}</p>
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label>Quantity</Label>
                                                <Input type="number" name={item.getFieldset().quantity.name} defaultValue={item.getFieldset().quantity.initialValue} key={item.getFieldset().quantity.key} />
                                                <p className="text-red-500 text-sm">{item.getFieldset().quantity.errors}</p>
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label>Rate (in {fields.currency.value})</Label>
                                                <Input type="number" name={item.getFieldset().rate.name} defaultValue={item.getFieldset().rate.initialValue} key={item.getFieldset().rate.key} step={currency !== "INR" ? 0.01 : 1}/>
                                                <p className="text-red-500 text-sm">{item.getFieldset().rate.errors}</p>
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label>Amount (in {fields.currency.value})</Label>
                                                <Input type="string" value={calculateAmount(item.getFieldset().quantity.value || "1", item.getFieldset().rate.value || "0")} key={item.getFieldset().amount.key} className="border-none" placeholder="$100" step={0.01} readOnly />
                                                <input type="hidden" name={item.getFieldset().amount.name} value={Number(item.getFieldset().quantity.value || "1") * Number(item.getFieldset().rate.value || "0")}/>
                                                <p className="text-red-500 text-sm">{item.getFieldset().amount.errors}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Card>
                        </div>
                    </CardContent>

                    <div className="flex justify-end mr-5 mt-3">
                        <p className="font-semibold">Total Amount: {formatCurrency(calculateTotalAmount, currency)}</p>
                        <input type="hidden" name={fields.totalAmount.name} value={calculateTotalAmount} />
                    </div>

                    <div className="space-y-2 px-5">
                        <Label>Additional Notes (Optional)</Label>
                        <Textarea id={fields.note.id} name={fields.note.name} defaultValue={fields.note.initialValue} key={fields.note.key}/>
                        <p className="text-red-500 text-sm">{fields.note.errors}</p>
                    </div>

                    <div className="flex justify-end px-4 mt-3">
                        <SubmitButton text="Update Invoice" loadingText="Updating..."/>
                    </div>
                </form>
            </Card>
        </div>
    )
}