import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female','prefer not to say']
    }
})

const User = model('User',userSchema)

export default User;