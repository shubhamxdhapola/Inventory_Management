import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protect = async (req, res, next) => {
    
    try {
        const token = req.cookies.token
        if(!token) return res.status(401).json({message : 'Unauthorized - No Token Provided!'})

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!decodedToken) res.status(401).json({message : 'Unauthorized - Invalid Token'})

        const user = await User.findById(decodedToken.userId)
        if(!user) return res.status(404).json({message : 'User not found!'})

        req.userId = user._id

        next()

    } catch(err) {
        next(err)
    }
}