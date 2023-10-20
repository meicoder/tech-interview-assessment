import { useEffect, useState } from 'react';
/* import axios, { AxiosError } from 'axios'; */
import { Invoice } from '../interfaces/invoice';
import InvoiceItem from './InvoiceItem';
import { io } from 'socket.io-client';
import Error from './Error';

const socket = io('http://localhost:3000');

const Body = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onNewInvoice(value: Invoice) {
            setInvoices((previous) => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('newInvoice', onNewInvoice);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('newInvoice', onNewInvoice);
        };
    }, [invoices]);

    return (
        <div className="flex flex-col">
            <h1>Invoices</h1>
            {!isConnected && <Error message="Socket not connected" />}
            <div className="flex flex-col gap-4">
                {invoices.map((invoice) => {
                    return <InvoiceItem invoice={invoice} key={invoice._id} />;
                })}
            </div>
        </div>
    );
};

export default Body;
