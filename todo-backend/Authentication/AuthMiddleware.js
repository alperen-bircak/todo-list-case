import { Error } from "../Utilities/UtilityFunctions.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { createSecretKey } from "crypto";
import { jwtVerify } from "jose";
import User from "../Schemas/UserSchema.js";
import getSecretKey from "../Utilities/SecretKey.js";
const Auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      throw Error(
        StatusCodes.UNAUTHORIZED,
        "You do not have the Authorization header set"
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const secretKey = getSecretKey();

    const { payload, protectedHeader } = await jwtVerify(token, secretKey);

    if (!payload.exp || Date.now() >= payload.exp * 1000) {
      throw Error(StatusCodes.UNAUTHORIZED, "expired token");
    }

    const user = await User.findById(payload._id).select("username");
    if (!user) {
      throw Error(StatusCodes.UNAUTHORIZED, "user does not exist");
    }
    req.user = user;

    next();
  } catch (error) {
    if (error.name === "JWSInvalid") {
      next(Error(StatusCodes.UNAUTHORIZED, "your JWT is invalid"));
    }
    next(error);
  }
};

export default Auth;
