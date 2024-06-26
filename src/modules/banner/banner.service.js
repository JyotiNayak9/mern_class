const BannerModel = require("./banner.model")

class BannerService{
    createBanner = async (data) =>{
        try{
            const banner = new BannerModel(data)
        return await banner.save()    
       }catch(exception){
        throw exception
       }

    }

    listData = async({skip=0,limit=10, filter={}}) =>{
        try{
            const count = await BannerModel.countDocuments(filter);
            const data = await BannerModel.find(filter)
                            .populate("createdBy", ["_id","name", "email", "role"])
                            .sort({_id: "desc"})
                            .limit(limit)
                            .skip(skip)

            return{count, data}
        }catch(exception){
            throw(exception)
        }
            }
        }

module.exports = new BannerService()