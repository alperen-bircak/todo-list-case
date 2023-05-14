import { Error } from "../Utilities/UtilityFunctions.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import User from "../Schemas/UserSchema.js";
import bcrypt from "bcrypt";
import { createSecretKey } from "crypto";
import { SignJWT } from "jose";
import getSecretKey from "../Utilities/SecretKey.js";

const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      throw Error(StatusCodes.BAD_REQUEST, "Username and password required");
    }

    const user = await User.findOne({ username: username }).select(
      "username password_hash"
    );

    if (!user) {
      throw Error(StatusCodes.BAD_REQUEST, "User not found");
    }
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      throw Error(StatusCodes.UNAUTHORIZED, "Wrong username or password");
    }

    const secretKey = getSecretKey();
    const token = await new SignJWT({ _id: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
      .sign(secretKey);

    res.status(201).json({ token: token, username: user.username });
  } catch (error) {
    next(error);
  }
};

export default Login;
