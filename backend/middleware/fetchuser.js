var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mayankis';

const fetchuser=(req,res,next)=>{
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');//extract token from auth-header
  
    if(!token){//return 401 for missing token
      return  res.status(401).send({error:"Please authenticate using a valid token"})
    }

    try{
const data = jwt.verify(token,JWT_SECRET);//verify token with JWT

// req.user= data.user;// attach user to req after token verification
req.user = { id: data.user.id };
next();}

catch(error){
    console.error("Token verification failed:", error.message);
    res.status(401).send({error:"Please authenticate using a valid token"})
    }
}


module.exports = fetchuser;
