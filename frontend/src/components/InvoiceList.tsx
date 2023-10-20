import { ReactNode } from 'react';
import { Invoice } from '../interfaces/invoice';
import Error from './Error';
import Loader from './Loader';

interface props {
    title: string;
    invoices: Invoice[];
    isConnected: boolean;
    status: string;
    children: ReactNode;
}
const InvoiceList = ({
    title,
    invoices,
    isConnected,
    status,
    children
}: props) => {
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

            {!isConnected && <Error message="Socket not connected" />}
            {status === 'loading' && <Loader />}
            {children}
        </div>
    );
};

export default InvoiceList;
