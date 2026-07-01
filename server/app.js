const express=require("express");
const dotenv=require("dotenv")
const cors = require("cors");
dotenv.config();
const app=express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const connectDB=require("./config/db")
const workFlowRoutes=require("./routes/workFlowRoute")
const testRoutes=require("./routes/testRoutes")
const executionRoutes = require('./routes/executionRoutes');
const webhookRoute = require('./routes/webhookRoute');
const customerRoutes = require('./routes/customerRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const businessConfigRoute = require("./routes/businessConfigRoute");
const integrationRoutes = require('./routes/integrationRoutes');


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use(cookieParser());


app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
});

const PORT=process.env.PORT

connectDB();

app.get("/",(req,res)=>{
    res.send("working")
})


app.use('/api/auth', authRoutes);
app.use("/api/workflows",workFlowRoutes)
app.use("/api/test",testRoutes)
app.use('/api/executions', executionRoutes);
app.use('/api/webhook', webhookRoute);
app.use('/api/customers', customerRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use("/api/business-config", businessConfigRoute);
app.use('/api/integrations', integrationRoutes);

app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
})
