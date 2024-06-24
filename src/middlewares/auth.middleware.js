const loginCheck = (req, res, next) => {
    // success => immediate another call
    // failed => call end
    let user = {}
    if(user){
        next()
    
    }else{
        next({status: 401, message:"ypu need to login first"})
    }
    // console.log("i am a custom vallue")
        // next({})
    
        // res.status(401).json()
    }

    module.exports = loginCheck;