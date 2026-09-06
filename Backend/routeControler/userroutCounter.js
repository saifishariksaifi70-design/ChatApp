import User from "../Models/userModels.js";
import bcryptjs from "bcryptjs";
import jwtToken from '../utils/jwtwebTocken.js'

export const userRegister = async(req,res)=>{
    try {
        const {fullname, username, email, gender, password, profilepic} = req.body;
        const user = await User.findOne({
            $or : [{username}, {email}]
        });
        if(user) 
            return res.status(400).send({success: false, message : "UserName or Email exist"});

        const hashPassword = bcryptjs.hashSync(password,10);
        const profileBoy = profilepic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
        const profileGirl = profilepic || `https://api.dicebear.com/7.x/lorelei/svg?seed=${username}`

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: gender === "male" ? profileBoy : profileGirl
        });

        if(newUser){
            await newUser.save();
            jwtToken(newUser._id,res)

         return res.status(201).send({
            _id: newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilepic:newUser.profilepic,
            email:newUser.email,
        });
        }else{
            res.status(400).send({ succes : false, message: "Invalid User Data"})
        }

    } catch (error) {
        console.log(error)

        res.status(500).send({
            succes: false,
            message: error.message
        })
        
        
    }
}

export const userLogin = async (req,res)=>{
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email})
        if(!user) return res.status(400).send({ success : false, message : "Email Doesn't Exit register"})
            const comparePass = bcryptjs.compareSync(password, user.password || "")
        if(!comparePass) return res.status(400).send({ success : false, message : "Email and Password Doesn't Matching"})
            jwtToken(user._id, res)

            res.status(200).json({
                success:true,
            _id: user._id,
            fullname:user.fullname,
            username:user.username,
            profilepic:user.profilepic,
            email:user.email,
            message: "succesfully Login"
                
            })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            succes: false,
            message: error.message || "Internal Server Error"
        })
    }


}

export const userLogout =async (req,res)=>{
    try {
        res.cookie("jwt",'',{
            maxAge: 0,
            expires: new Date(0),
            httpOnly: true,
            sameSite: "lax",
            secure: false

        })
        res.status(200).json({
            message: "User LogOut Successfully"})
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            succes: false,
            message: error.message || "Internal Server Error"
        })
        
    }

}
