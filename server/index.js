const express = require("express")
const app = express()
require('dotenv').config()
const cors = require('cors');
app.use(cors()); // Enable CORS for all origins
app.use(express.json())//middleware
const adminRouter = require('./router/adminRoute');
const userRouter = require('./router/userRoute');
const paymentRouter = require('./router/paymentRoute');
const {ConnectDB}= require('./utils/dbConnector');
 ConnectDB();
app.use('/payment',paymentRouter);
app.use('/api/admin',adminRouter);
app.use('/api/user',userRouter);
app.listen(process.env.PORT,()=>{
    console.log("App is running ");
})

//download and extract and open in vs code
//cd server 
//if node_modules exist / error occur delete no_modules folder 
//npm i
//npx prisma generate 
//npm run dev