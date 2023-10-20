require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const invoiceRoutes = require('./routes/invoice');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URI
    }
});

io.on('connection', (socket) => {
    console.log('connected', socket.id);
});

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/invoices', invoiceRoutes(io));

// connect to DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        httpServer.listen(process.env.PORT, () => {
            console.log(
                'connected to DB & listening on port',
                process.env.PORT
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
