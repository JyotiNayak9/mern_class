const bannerRouter = require("express").Router();

const { fileFilterType } = require("../../config/constants.config");
const loginCheck = require("../../middlewares/auth.middleware");
const hasPermission = require("../../middlewares/rbac.middleware");
const { setPath, uploadfile } = require("../../middlewares/uploader.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const bannerController = require("./banner.controller");
const { BannerCreateDTO } = require("./banner.request");

bannerRouter.route('/')
    .post(loginCheck, hasPermission("admin"), setPath('banner'), uploadfile(fileFilterType.IMAGE).single("image"), bodyValidator(BannerCreateDTO),bannerController.create)
    .get(loginCheck, hasPermission('admin'), bannerController.index)
module.exports = bannerRouter;