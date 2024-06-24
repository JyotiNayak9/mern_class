const { userSvc } = require("../user/user.service");

class AuthController {
    activateUser = async (req,res, next) =>{
        try{
            const {token} = req.params;
            if(token.length !== 100){
                throw{status: 422, message:"Inalid Token"}
            }
            const user = await userSvc.getSingleUserByFilter({
                activationToken: token
            })
        }catch(exception){
            next(exception)
        }
    }
}

module.exports = new AuthController()