import { Invoice } from '../interfaces/invoice';
import Status from './Status';
import Button from './Button';
import { BsPinMapFill } from 'react-icons/bs';
import { useAppDispatch } from '../../src/redux/hooks';
import { approveInvoice, deleteInvoice } from '../redux/invoiceSlice';

interface props {
    invoice: Invoice;
}
const InvoiceItem = ({ invoice }: props) => {
    const dispatch = useAppDispatch();
    const handleApproveBtn = async () => {
        dispatch(approveInvoice(invoice));
    };

    const handleDeleteBtn = async () => {
        dispatch(deleteInvoice(invoice));
    };

    return (
        <>
            <div className="hidden bg-white md:flex justify-between gap-16 px-2 py-4 shadow-lg rounded-lg cursor-pointer border-l-4 duration-100  ease-in-out  hover:border-l-4 border-custom-pink hover:border-custom-blue hover:border group ">
                <div className=" flex items-center  ">
                    <h2 className="px-2">{`# ${invoice.invoice_number}`}</h2>
                    <h2 className="px-2 text-gray-500 text-xs ">
                        {`Due ${invoice.due_date}`}
                    </h2>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 ">
                    <h2 className=" text-gray-400 text-lg font-semibold ">
                        {invoice.vendor_name}
                    </h2>
                    <h2 className=" text-gray-400 text-xs flex gap-2  ">
                        <BsPinMapFill />
                        {invoice.remittance_address}
                    </h2>
                </div>
                <div className="flex ">
                    <div className="flex flex-col items-center justify-center gap-1 ">
                        <h2 className=" text-gray-500 text-lg font-semibold ">{`${invoice.currency} ${invoice.total}`}</h2>
                        <h2 className=" text-gray-500 text-xs ">
                            {invoice.invoice_date}
                        </h2>
                    </div>
                    <div className="px-4 flex justify-center items-center gap-2">
                        <Status status={invoice.status} />
                        <div className="flex gap-3 border-l-2 pl-4">
                            <Button
                                text="Approve"
                                disabled={
                                    invoice.status === 'approved' ? true : false
                                }
                                onClickHandler={handleApproveBtn}
                            />
                            <Button
                                text="Delete"
                                disabled={false}
                                onClickHandler={handleDeleteBtn}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:hidden px-4 py-2 bg-white shadow-md rounded-lg cursor-pointer border-l-4 duration-100 ease-in-out hover:border-l-4 border-custom-pink hover:border-custom-blue hover:border group">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <div>
                            <h2 className=" text-gray-500 text-base font-semibold my-1">{`${invoice.currency} ${invoice.total}`}</h2>
                            <h2 className=" text-gray-500 text-xs my-1">
                                {invoice.invoice_date}
                            </h2>
                        </div>
                        <div>
                            <h2 className=" text-gray-400 text-base font-semibold my-1">
                                {invoice.vendor_name}
                            </h2>
                            <h2 className=" text-gray-400 text-xs flex">
                                <BsPinMapFill />
                                {invoice.remittance_address}
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                            <h2 className="my-1 text-right">{`# ${invoice.invoice_number}`}</h2>
                            <h2 className=" text-gray-500 text-xs ">
                                {`Due ${invoice.due_date}`}
                            </h2>
                        </div>
                        <div>
                            <Status status={invoice.status} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-around mt-4 border-t-2 py-4">
                    <Button
                        text="Approve"
                        disabled={invoice.status === 'approved' ? true : false}
                        onClickHandler={handleApproveBtn}
                    />
                    <Button
                        text="Delete"
                        disabled={false}
                        onClickHandler={handleDeleteBtn}
                    />
                </div>
            </div>
        </>
    );
};

export default InvoiceItem;
