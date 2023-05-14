import { createSecretKey } from "crypto";

let secretKey;
const getSecretKey = () => {
  if (!secretKey) {
    secretKey = createSecretKey(process.env.JWT_SECRET, "utf-8");
  }
  return secretKey;
};
export default getSecretKey;
