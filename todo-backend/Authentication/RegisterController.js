import User from "../Schemas/UserSchema.js"
import bcrypt from 'bcrypt';
import  mongoose from "mongoose";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
import { Error } from "../Utilities/UtilityFunctions.js";

const Register = async (req, res, next) => {
    try {
        const { userName, password } = req.body
        const saltRounds = 10
        
        

        if(!(userName && password)) {
           
          throw Error(StatusCodes.BAD_REQUEST, "Username and password required")

        }
        const user = {
            username: userName
        };

        user.password_hash = await bcrypt.hash(password, saltRounds)

        await new User(user).save();

        res.status(201).json({})
    }
     catch (error) {
        if(error.name==='MongoServerError' && error.code === 11000) {
            next(Error(StatusCodes.BAD_REQUEST, "Username already taken"))
        }
        next(error)
    }

}

export default Register