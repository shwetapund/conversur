import User from './../model/User.js';
import md5 from 'md5';

const signupApi = async(req,res)=>{
    const {userName, email, password} = req.body;

    const nameAlreadyExist = await User.findOne({userName})
    if(nameAlreadyExist){
        res.status(400).json({
            success:false,
            message:'name already exists'
        })
    }
    const emailAlreadyExits = await User.findOne({email})
    if(emailAlreadyExits){
        res.status(400).json({
            success:false,
            message:'email already exists'
        })
    }

    try{
        
    const obj = new User({
        userName, 
        email,
        password: md5(password),        
    })
    const savedUser = await obj.save();

    res.json({
        success:true,
        data:savedUser,
        message:'successfully signup'
    })
    }
    catch(err){
        res.json({
            success:false,
            message:err.message
        })
    }
}

const loginApi = async(req,res)=>{
    const {email, password} = req.body;

   if(!email || !password){
    res.json({
        success:false,
        message:'please enter valid email or password'
    })
   }

   const findUser = await User.findOne({
    email:email,
    password: md5(password)
   }).select('email gender mobile name')

   if(!findUser){
    res.json({
        success:false,
        message:'user not found'
    })
   }
   res.json({
    success:true,
    data:findUser,
    message:'successfully login'
   })

}

export {signupApi, loginApi};