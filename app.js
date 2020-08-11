const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pino = require('express-pino-logger')();
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const videoRoutes = require('./routes/videoRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})


app.use(pino);
app.use('api/video',videoRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/patient',patientRoutes);
app.use('/api/doctor',doctorRoutes);

app.use((error, req, res, next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message, data: data
    });
})

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true
})
.then(res => {
    console.log("connected");
    app.listen(8080);
})
.catch(err => console.log(err));