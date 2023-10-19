export interface Invoice {
    _id: string;
    invoice_number: string;
    total: string;
    currency: string;
    invoice_date: string;
    due_date: string;
    vendor_name: string;
    remittance_address: string;
    status: string;
}
