const express = require('express');
const {
    getInvoices,
    createInvoice,
    updateInvoice
} = require('../controllers/invoiceController');

const router = express.Router();

// GET all invoices
router.get('/', getInvoices);

// POST new invoice
router.post('/', createInvoice);

// UPDATE a invoice
router.patch('/:id', updateInvoice);

module.exports = router;
