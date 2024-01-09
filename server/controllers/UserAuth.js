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

export {signupApi};