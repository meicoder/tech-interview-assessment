const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
    {
        invoice_number: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        invoice_date: {
            type: String,
            required: true
        },
        due_date: {
            type: String,
            required: true
        },
        vendor_name: {
            type: String,
            required: true
        },
        remittance_address: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

invoiceSchema.statics.addInvoice = async function addInvoice(
    invoice_number,
    total,
    currency,
    invoice_date,
    due_date,
    vendor_name,
    remittance_address
) {
    // validations
    if (
        !invoice_number ||
        !total ||
        !currency ||
        !invoice_date ||
        !due_date ||
        !vendor_name ||
        !remittance_address
    ) {
        throw Error('All fields must be filled');
    }
    if (
        !validator.isCurrency(total, {
            allow_negatives: false
        })
    ) {
        throw Error('Total is not valid amount. It must be a positive number');
    }
    if (
        !validator.isDate(invoice_date, {
            format: 'YYYY-MM-DD',
            strictMode: true
        })
    ) {
        throw Error('Invoice Date is not valid. Fill in format YYYY-MM-DD');
    }
    if (
        !validator.isDate(due_date, {
            format: 'YYYY-MM-DD',
            strictMode: true
        })
    ) {
        throw Error('Due Date is not valid. Fill in format YYYY-MM-DD');
    }
    const exists = await this.findOne({ invoice_number });

    if (exists) {
        throw Error('Invoice number already in use');
    }

    const invoice = await this.create({
        invoice_number,
        total,
        currency,
        invoice_date,
        due_date,
        vendor_name,
        remittance_address,
        status: 'pending'
    });

    return invoice;
};

module.exports = mongoose.model('Invoice', invoiceSchema);
