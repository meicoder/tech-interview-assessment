import { useEffect, useState } from 'react';
import { Invoice } from '../interfaces/invoice';
import InvoiceItem from './InvoiceItem';
import { io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { addInvoice, fetchInvoices } from '../redux/invoiceSlice';
import InvoiceList from './InvoiceList';
import Error from './Error';
import Loader from './Loader';

const socket = io(import.meta.env.VITE_BACKEND_URI);

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
        <div className="flex flex-col gap-8 w-full md:max-w-5xl px-4 ">
            {!isConnected && <Error message="Socket not connected" />}
            {status === 'loading' && <Loader />}
            <InvoiceList
                title="Pending Invoices"
                invoices={invoices.filter(
                    (invoice) => invoice.status === 'pending'
                )}
                isConnected={isConnected}
                status={status}
            >
                <div className="flex flex-col gap-4">
                    {invoices
                        .filter((invoice) => invoice.status === 'pending')
                        .map((invoice) => {
                            return (
                                <InvoiceItem
                                    invoice={invoice}
                                    key={invoice._id}
                                />
                            );
                        })}
                </div>
            </InvoiceList>
            <InvoiceList
                title="Approved Invoices"
                invoices={invoices.filter(
                    (invoice) => invoice.status !== 'pending'
                )}
                isConnected={isConnected}
                status={status}
            >
                <div className="flex flex-col gap-4">
                    {invoices
                        .filter((invoice) => invoice.status !== 'pending')
                        .map((invoice) => {
                            return (
                                <InvoiceItem
                                    invoice={invoice}
                                    key={invoice._id}
                                />
                            );
                        })}
                </div>
            </InvoiceList>
        </div>
    );
};

export default Body;
