const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Marcos Espinoza');
});
// connect to DB
mongoose
    .connect('mongodb://mongo/laundrydb')
    .then(() => {
        app.listen(3000, () => {
            console.log('connected to DB & listening on port', 3000);
        });
    })
    .catch((error) => {
        console.log(error);
    });
