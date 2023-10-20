const Invoice = require('../models/invoiceModel');
const mongoose = require('mongoose');

module.exports = (io) => {
    // Get all invoices
    const getInvoices = async (req, res) => {
        const invoices = await Invoice.find().sort({ createdAt: -1 });
        res.status(200).json(invoices);
    };

    // Create new invoice
    const createInvoice = async (req, res) => {
        const {
            invoice_number,
            total,
            currency,
            invoice_date,
            due_date,
            vendor_name,
            remittance_address
        } = req.body;

        try {
            const invoice = await Invoice.addInvoice(
                invoice_number,
                total,
                currency,
                invoice_date,
                due_date,
                vendor_name,
                remittance_address
            );
            res.status(200).json({
                message: 'invoice submitted successfully'
            });

            io.emit('newInvoice', invoice);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    };

    // Update a invoice
    const updateInvoice = async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                msg: 'No such invoice'
            });
        }

        const invoice = await Invoice.findByIdAndUpdate(
            { _id: id },
            {
                ...req.body
            }
        );

        if (!invoice) {
            return res.status(404).json({ msg: 'No such invoice' });
        }

        return res.status(200).json(invoice);
    };

    // Delete a invoice
    const deleteInvoice = async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                msg: 'No such invoice'
            });
        }
        const invoice = await Invoice.findOneAndDelete({ _id: id });

        if (!invoice) {
            return res.status(404).json({ msg: 'No such invoice' });
        }

        return res.status(200).json(invoice);
    };

    return {
        getInvoices,
        createInvoice,
        updateInvoice,
        deleteInvoice
    };
};
