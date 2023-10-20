import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Invoice } from '../interfaces/invoice';
import InvoiceItem from './InvoiceItem';

const Body = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const getInvoices = async () => {
            const abortController = new AbortController();
            const signal = abortController.signal;
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/invoices',
                    { signal }
                );
                setInvoices(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled:', error.message);
                    } else {
                        setError(error);
                    }
                }
            }
        };
        getInvoices();
    }, []);

    return (
        <div className="flex flex-col">
            <h1>Invoices</h1>
            {error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {invoices.map((invoice) => {
                        return (
                            <InvoiceItem invoice={invoice} key={invoice._id} />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Body;
