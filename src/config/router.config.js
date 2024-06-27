const router = require("express").Router();
const authRouter = require("../modules/auth/auth.router");
const bannerRouter = require("../modules/banner/banner.router");
const userRouter = require("../modules/user/user.router")
const brandRouter = require("../modules/brand/brand.router");

 router.use("/auth", authRouter)
 router.use("/user", userRouter)
 router.use("/banner",bannerRouter)
 router.use("/brand",brandRouter)


 module.exports = router;