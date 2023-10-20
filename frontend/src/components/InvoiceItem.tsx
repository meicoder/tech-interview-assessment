import { Invoice } from '../interfaces/invoice';
import Status from './Status';

interface props {
    invoice: Invoice;
}
const InvoiceItem = ({ invoice }: props) => {
    return (
        <div className="bg-white flex justify-between gap-8 px-2 py-4 shadow-lg rounded-lg cursor-pointer border-l-4 duration-100  ease-in-out  hover:border-l-4 border-custom-pink hover:border-custom-blue hover:border group ">
            <div className=" flex items-center  ">
                <h2 className="px-2">{`# ${invoice.invoice_number}`}</h2>
                <h2 className="px-2 text-gray-500 text-xs ">
                    {`Due ${invoice.due_date}`}
                </h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 ">
                <h2 className=" text-gray-500 text-lg font-semibold ">
                    {invoice.vendor_name}
                </h2>
                <h2 className=" text-gray-500 text-xs ">
                    {invoice.remittance_address}
                </h2>
            </div>
            <div className="flex ">
                <div className="flex flex-col items-center justify-center gap-2 ">
                    <h2 className=" text-gray-500 text-lg font-semibold ">{`${invoice.currency} ${invoice.total}`}</h2>
                    <h2 className=" text-gray-500 text-xs ">
                        {invoice.invoice_date}
                    </h2>
                </div>
                <div className="px-4 flex justify-center items-center">
                    <Status status={invoice.status} />
                </div>
            </div>
        </div>
    );
};

export default InvoiceItem;
