import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../interfaces/invoice';
import axios from 'axios';

const fetchInvoices = createAsyncThunk('invoices/fetch', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/invoices');
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
});

const approveInvoice = createAsyncThunk(
    'invoice/approve',
    async (invoice: Invoice) => {
        try {
            const response = await axios.patch(
                `http://localhost:3000/api/invoices/${invoice._id}`,
                { status: 'approved' }
            );
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }
);

const deleteInvoice = createAsyncThunk(
    'invoice/delete',
    async (invoice: Invoice) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/invoices/${invoice._id}`
            );
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }
);

const initialState: {
    invoices: Array<Invoice>;
    status: string;
} = {
    invoices: [],
    status: 'idle'
};

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        addInvoice: (state, action: PayloadAction<Invoice>) => {
            state.invoices.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.invoices = action.payload;
            })
            .addCase(fetchInvoices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(approveInvoice.fulfilled, (state, action) => {
                const updatedInvoices = state.invoices.map((invoice) => {
                    if (invoice._id === action.payload._id) {
                        return { ...invoice, status: 'approved' };
                    } else {
                        return invoice;
                    }
                });
                state.invoices = updatedInvoices;
                state.status = 'succeeded';
            })
            .addCase(approveInvoice.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                const filteredInvoices = state.invoices.filter((invoice) => {
                    if (invoice._id !== action.payload._id) {
                        return invoice;
                    }
                });
                state.invoices = filteredInvoices;
                state.status = 'succeeded';
            })
            .addCase(deleteInvoice.pending, (state) => {
                state.status = 'loading';
            });
    }
});

export { fetchInvoices, approveInvoice, deleteInvoice };
export const { addInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
