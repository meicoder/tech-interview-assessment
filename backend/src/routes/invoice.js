const express = require('express');
const tasksController = require('../controllers/invoiceController');

const router = express.Router();

module.exports = (io) => {
    const { createInvoice, getInvoices, updateInvoice } = tasksController(io);

    // GET all invoices
    router.get('/', getInvoices);

    // POST new invoice
    router.post('/', createInvoice);

    // UPDATE a invoice
    router.patch('/:id', updateInvoice);

    return router;
};
