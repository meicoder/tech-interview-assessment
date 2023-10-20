import { ReactNode } from 'react';
import { Invoice } from '../interfaces/invoice';

interface props {
    title: string;
    invoices: Invoice[];
    isConnected: boolean;
    status: string;
    children: ReactNode;
}
const InvoiceList = ({ title, invoices, children }: props) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col py-8">
                <h1 className="text-xl font-semibold text-custom-blue">
                    {title}
                </h1>
                <span className="text-xs text-gray-400">{`Total: ${
                    invoices.length || 0
                } ${title.toLowerCase()}`}</span>
            </div>

            {children}
        </div>
    );
};

export default InvoiceList;
