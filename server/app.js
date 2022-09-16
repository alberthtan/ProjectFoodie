require('./db');
const express = require('express');
require('dotenv').config();
const menuRouter = require('./routers/menu');

const app = express();
app.use('/api/menu', menuRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('port is listening on ' + PORT);
});