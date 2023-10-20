import { useEffect, useState } from 'react';
import axios from 'axios';
import { Invoice } from '../interfaces/invoice';
import InvoiceItem from './InvoiceItem';

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
            <div className="flex flex-col gap-4">
                {invoices.map((invoice) => {
                    return <InvoiceItem invoice={invoice} key={invoice._id} />;
                })}
            </div>
        </div>
    );
};

export default Body;
