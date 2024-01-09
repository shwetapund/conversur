import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

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


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
