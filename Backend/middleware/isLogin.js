import jwt from 'jsonwebtoken'
import User from '../Models/userModels.js'

const isLogin = async (req,res,next)=>{
    try {
        const token = req.cookies?.jwt ;
        if(!token) return res.status(400).json({success: false, message: "User Unauthorise"});
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) return res.status(400).json({success: false, message: "User Unauthorise -Invalid Token"});
        const user = await User.findById(decode.userId).select("-password");
        if(!user) return res.status(400).json({success:false, message: "User not Found"});
        req.user = user;
        next()
        
    } catch (error) {
        console.log(`error in isLogin middleware ${error.message}`);
        res.status(400).json({
            success:false,
            message: error.message
        })
        
    }

}

export default isLogin
