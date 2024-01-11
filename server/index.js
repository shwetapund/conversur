import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {signupApi, loginApi} from './controllers/UserAuth.js';
import {Server} from 'socket.io';

const app = express();
app.use(express.json());

const io = new Server(5002, {
    cors: {
        origin: '*'
    },
})

io.on('connection',(socket) =>{
    console.log('a user connected');

    socket.on('message',(data)=>{
        console.log(data);
    })
})

const PORT = process.env.PORT || 5000;

const mongoDBConn = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    if(conn){
        console.log('mongoDB is connect 💖');
    }
}
mongoDBConn();

app.get('/api/v1/health',async(req,res)=>{
    res.json({
        success:true,
        message:'All good'
    })
})

app.post('/api/v1/signup',signupApi)

app.post('/api/v1/login',loginApi)

app.get('/api/v1/sendMessage',(req,res)=>{
    const {message} = req.query;
    io.emit('receive',message);
    res.json({
        message:'message sent'
    });
})

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
