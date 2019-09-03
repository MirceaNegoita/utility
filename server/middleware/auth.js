import jwt from 'jsonwebtoken';

class AuthMiddleware{
    verifyToken(req,res,next){
        const token = req.header("auth-header");
        if(!token) return res.status(400).send({message: "Access denied"});

        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            return res.status(400).send({message: "Invalid token"})
        }
    }
}

export default AuthMiddleware;