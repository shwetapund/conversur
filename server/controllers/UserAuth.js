import User from './../model/User.js';

const signupApi = async(req,res)=>{
    const {name, email, password, gender, mobile} = req.body;

    try{
        
    const obj = new User({
        name, 
        email,
        password, 
        gender, 
        mobile
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
    password:password
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