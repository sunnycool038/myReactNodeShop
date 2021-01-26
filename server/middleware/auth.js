import jwt from 'jsonwebtoken';

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({message:'no token, authorization denied'});
    console.log(token);
    
    try{
        console.log(token);
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(e){
        return res.status(400).json({message:'token is not valid'});
    }
}

export default auth;