const authRouter = require("express").Router();
const {setPath, uploadfile} = require("../../middlewares/uploader.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const userCtrl = require("../user/user.controller");
const { userCreateDTO } = require("../user/user.request");
const authController = require("./auth.controller");


authRouter.post("/login",(req, res)=>{

})
authRouter.post("/register", setPath('user'),uploadfile().single('image'),bodyValidator(userCreateDTO),  userCtrl.userCreate)
authRouter.get("/activate/:token",authController.activateUser)

module.exports = authRouter;