require ("dotenv").config();
const bcrypt = require("bcryptjs");
const { randomStringGenerator, deleteFile } = require("../../utilities/helper");
const mailSvc = require("../../services/mail.service");
const UserModel = require("./user.model");



class UserService{
    transformUserCreate = (req) =>{
        const data = req.body;

            if(req.file){
                data.image = req.file.filename
            }
            data.password = bcrypt.hashSync(data.password, 10)
            
            data.activationToken = randomStringGenerator(100)
            data.status = "inactive"
            data.activateFor = new Date(Date.now()+(4*60*60*1000))       //1970-1-1  00:00:00
            return data;
    }

    sendActivationEmail =  async ({name, email, token}) =>{
        try{
            await mailSvc.sendEmail({
                to: email,
                sub: "Activate your account",
                message : `
                Dear ${name}, <br/>
                <p>Your account has been registered successfully</p>
                <p> Please click on the link below or copy and paste the url inthe browser to activate your account: </p>
                <a href = "${process.env.FRONTEND_URL+'activate/'+token}">${process.env.FRONTEND_URL+'activate/'+token}</a>
                <br>
                <p>----------------------------------------------------</p>
                <p>Regards</p>
                <p>System Admin</p>
                <p>"${process.env.SMTP_FROM}"</p>
                <p>
                <small><i>Please do not reply to this email</i></small>
                </p>               
                `
                
            })
        }catch(exception){
            throw exception
        }
    }

    registerUser = async (data)=>{
        try{
            const user = new UserModel(data);
              return await user.save();
        }catch(exception){
            if(data.image){
                deleteFile("./public/uploads/user/"+data.image);
            }
            throw(exception)
            // throw {status:400, detail: msg, message: "validation failed"}
        }
    }

    getSingleUserByFilter = async(filter) =>{
        try{
           const UserDetail = await UserModel.findOne(filter);
           if(UserDetail){
            return UserDetail;
           }else{
            throw {status : 404, message: "User doesnot exist"}
           }
        }catch(exception){
            throw exception
        }
    }
}

const userSvc = new UserService()
module.exports = {
    userSvc
}