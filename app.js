require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const mainRouter = require('./src/routes/main');

//middleware
const notFoundMiddleware = require('./src/middleware/not-found');
const errorMiddleware = require('./src/middleware/error-handler');

app.use(express.static('./public'));
app.use(express.json());


app.use('/api/v1', mainRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 9000;
const start = async () => {
    try{
        //connectDb
        app.listen(port, console.log(`Server is listening at port ${port}`))
    }catch(err){
        console.log(err);
    }
} 

start();