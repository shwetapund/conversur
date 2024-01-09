import {Schema, model} from 'mongoose';

const meassgeSchema = new Schema({
    message:String,
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
},
{
    timestamps:true,
});

const Message = model('Message',meassgeSchema)
export default Message