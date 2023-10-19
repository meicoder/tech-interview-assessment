import { useEffect, useState } from 'react';
import axios from 'axios';

interface Invoice {
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
const Body = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    useEffect(() => {
        const getInvoices = async () => {
            const response = await axios.get(
                'http://localhost:3000/api/invoices'
            );
            setInvoices(response.data);
        };
        getInvoices();
    }, []);
    return (
        <div className="flex flex-col">
            <h1>Invoices</h1>
            {invoices.map((invoice) => {
                return <div key={invoice._id}>{invoice.vendor_name} </div>;
            })}
        </div>
    );
};

export default Body;
