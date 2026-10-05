import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import saveCookie from "../utils/saveCookie.js";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(401).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(401).json({ message: "Email already exists" })
        }


        const newUser = await User.create({
            name, email, password,
        })

        if (newUser) {
            const token = generateToken(newUser._id)
            saveCookie(token, res)
            res.status(201).json({
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
                message: "Registered successfully"
            })
        } else {
            return res.status(500).json("Unable to register")
        }
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const passwordCorrect = await user.comparePassword(password)
        if (!passwordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        if (user) {
            const token = generateToken(user._id)
            saveCookie(token, res)
            res.status(200).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                message: "Logged in successfully"
            })
        }
    } catch (error) {
        next(error)
    }
}

export const getUserInfo = async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in getUserInfo controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const logoutUser = async (_, res, next) => {
    try {
        res.cookie('authToken', "", { maxAge: 0, secure: true, sameSite: "None" })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        next(error)
    }
}