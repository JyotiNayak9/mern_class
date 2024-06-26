const uploadImage = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilities/helper");
const bannerService = require("./banner.service");

class BannerController{
    create = async(req, res, next) =>{
        try{
            const data = req.body;
            data.image = await uploadImage("./public/uploads/banner/"+req.file.filename)
            deleteFile("./public/uploads/banner/"+req.file.filename)
            data.createdBy = req.authUser._id;
            const banner = await bannerService.createBanner(data)

            res.json({
                result: banner,
                message: "banner created",
                meta: null
            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    index = async(req, res, next) =>{
        try{
            const page = +req.query.page || 1
            const limit = +req.query.limit || 10
            const skip = (page - 1)*limit

            let filter = {};
            if(req.query.search){
                filter = {
                    title: new RegExp(req.query.search, 'i')
                }
            }

            const {count, data} = await bannerService.listData({
                skip: skip,
                limit:limit,
                filter: filter
            });

            res.json({
                result: data,
                message: "banner list all",
                meta: {
                    currentPage: page,
                    total: count,
                    limit: limit
                }
            })
        }catch(exception){
            next(exception)
        }
    }
    show = async(req, res, next) =>{
        
    }
    update = async(req, res, next) =>{
        
    }
    delete = async(req, res, next) =>{
        
    }
}

module.exports = new BannerController()