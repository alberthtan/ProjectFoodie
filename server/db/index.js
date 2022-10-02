const mongoose = require('mongoose');

const dbURL = 'mongodb+srv://allenchun360:time24@dutchpay.oqx353s.mongodb.net/?retryWrites=true&w=majority'
mongoose
    .connect(dbURL)
    .then(() => console.log('db connected'))
    .catch((err) => console.log('db connection failed: ', err.message || err));