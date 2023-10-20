import { useEffect, useState } from 'react';
import { Invoice } from '../interfaces/invoice';
import InvoiceItem from './InvoiceItem';
import { io } from 'socket.io-client';
import Error from './Error';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { addInvoice, fetchInvoices } from '../redux/invoiceSlice';
import Loader from './Loader';

const socket = io('http://localhost:3000');

const Body = () => {
    const dispatch = useAppDispatch();
    const { invoices, status } = useAppSelector((state) => state);

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        dispatch(fetchInvoices());
    }, [dispatch]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onNewInvoice(value: Invoice) {
            dispatch(addInvoice(value));
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('newInvoice', onNewInvoice);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('newInvoice', onNewInvoice);
        };
    }, [invoices, dispatch]);

    return (
        <div className="flex flex-col">
            <h1>Invoices</h1>
            {!isConnected && <Error message="Socket not connected" />}
            {status === 'loading' && <Loader />}
            <div className="flex flex-col gap-4">
                {invoices.map((invoice) => {
                    return <InvoiceItem invoice={invoice} key={invoice._id} />;
                })}
            </div>
        </div>
    );
};

export default Body;
