const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    const token = req.cookies.auth;
    if(!token)
    {
        return res.sendStatus(401);
    }

    try {
        jwt.verify(token,process.env.KEY)
        
    next() 
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}

module.exports = verifyToken;