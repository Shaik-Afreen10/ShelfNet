const express = require("express")
const app = express()
require('dotenv').config()
const cors = require('cors');
app.use(cors()); 
app.use(express.json())

const adminRouter = require('./router/adminRoute');
const userRouter = require('./router/userRoute');
const paymentRouter = require('./router/paymentRoute');
// 1️⃣ IMPORT the new compiler router
const compilerRouter = require('./router/compilerRouter'); 

const {ConnectDB} = require('./utils/dbConnector');
ConnectDB();

app.use('/payment', paymentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
// 2️⃣ MOUNT the compiler router at the root level matching your test script path
app.use('/compiler', compilerRouter); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});