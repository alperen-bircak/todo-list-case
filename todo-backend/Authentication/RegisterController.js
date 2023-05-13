import User from "../Schemas/UserSchema.js"
import bcrypt from 'bcrypt';
const Register = async (req, res, next) => {
    try {
        const { userName, password } = req.body
        const saltRounds = 10
        

        if(!(userName, password)) {
            const error = {
                statusCode: 400,
                message: "User Name and Password required."
            }
            throw error
        }
        const user = {
            username: userName
        };

        user.password_hash = await bcrypt.hash(password, saltRounds)

        await new User(user).save();

        res.status(201).json({})
    } catch (error) {
        next(error)
    }

}

export default Register