import { Invoice } from '../interfaces/invoice';

interface props {
    invoice: Invoice;
}
const InvoiceItem = ({ invoice }: props) => {
    return (
        <div className="bg-white flex justify-between gap-8 px-2 py-4 shadow-lg rounded-lg cursor-pointer border-l-4 duration-100  ease-in-out  hover:border-l-4 border-custom-blue hover:bg-custom-pink group ">
            <div className=" flex items-center group-hover:text-custom-white ">
                <h2 className="px-2">{`# ${invoice.invoice_number}`}</h2>
                <h2 className="px-2 text-gray-500 text-xs group-hover:text-custom-white">
                    {`Due ${invoice.due_date}`}
                </h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 ">
                <h2 className=" text-gray-500 text-lg font-semibold group-hover:text-custom-white">
                    {invoice.vendor_name}
                </h2>
                <h2 className=" text-gray-500 text-xs group-hover:text-custom-white">
                    {invoice.remittance_address}
                </h2>
            </div>
            <div className="flex ">
                <div className="flex flex-col items-center justify-center gap-2 ">
                    <h2 className=" text-gray-500 text-lg font-semibold group-hover:text-custom-white">{`${invoice.currency} ${invoice.total}`}</h2>
                    <h2 className=" text-gray-500 text-xs group-hover:text-custom-white">
                        {invoice.invoice_date}
                    </h2>
                </div>
                <div className="px-4 flex justify-center items-center">
                    {invoice.status}
                </div>
            </div>
        </div>
    );
};

export default InvoiceItem;
