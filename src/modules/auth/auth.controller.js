const { JsonWebTokenError } = require("jsonwebtoken");
const { StatusType } = require("../../config/constants.config");
const { userSvc } = require("../user/user.service");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class AuthController {
    activateUser = async (req,res, next) => {
        try{
            const {token} = req.params;
            if(token.length !== 100){
                throw {status: 422, message:"Inalid Token"}
            }
           let user = await userSvc.getSingleUserByFilter({
                activationToken: token
            })
            const today = Date.now()
            let activateFor = user.activateFor.getTime();
            if(activateFor < today){
                throw {status:422, message :"Token expired"}
            }

            user.activationToken= null;
            user.activateFor = null;
            user.status = StatusType.ACTIVE

            await user.save();

            res.json({
                result : null,
                message: "Your account has been activeted successfully. Please login to proceed",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    resendActivationToken = async (req,res, next) =>{
        try{
            const {token} = req.params;
            let user = await userSvc.getSingleUserByFilter({
                activationToken :token
            })
            user = userSvc.generateUserActivationToken(user);
            await user.save();     
            await userSvc.sendActivationEmail({
                email: user.email,
                name : user.name,
                token : user.activationToken,
                sub: "Re-send, Activate your account"
            })
            res.json({
                result:null,
                message: "A new activation token has been sent to your registered email. Please follow the process to activate your account",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    login = async (req, res, next) =>{
        try{
            const {email, password} = req.body

            const user = await userSvc.getSingleUserByFilter({
                email:email
            })

            if(bcrypt.compareSync(password, user.password)){
                if(user.status === StatusType.ACTIVE){

                    const token = jwt.sign({
                        sub: user._id
                    }, process.env.JWT_SECRET,
                    // {
                    //     expiresIn: "1 day",
                    //     algorithm
                    // }
                );

                res.json({
                    result: {
                        UserDetail:{
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            role:user.role
                        },
                        token: token
                    },
                        message: "login successful",
                        meta: null
                    })
                }else{
                    throw {status:422, message: "your account has not been activated yet"}
                }
            }else{
                throw {status: 422, message:"Credentials doesnot match"}
            }
        }catch(exception){
            next(exception)
        }
    }
    
    getloggedinUser = (req, res, next) =>{
        try{
            res.json({
                result: req.authUser,
                message: "Your Profile",
                meta: null

            })
        } catch(exception){
            next(exception)
        }
    }
}

module.exports = new AuthController()