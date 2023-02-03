import cookie from "js-cookie";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { User } from "../../types";

export const getUser = (): User | null => {
  let token = cookie.get("token");
  if (token) {
    return decodeUser(token);
  }
  return null;
};

export const decodeUser = (token: string): User | null => {
  if (token) {
    const decodedUser = jwtDecode<User>(token);
    return {
      pin: decodedUser.pin,
      expire: new Date(decodedUser.expire as Date),
    };
  }
  return null;
};

export const setUser = (token: string, expire?: Date) => {
  cookie.set("token", token, { expires: expire || 1 });
};

export const removeUser = () => {
  cookie.remove("token");
};

export const signToken = async (user: User, expire?: Date) => {
  return await jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: expire?.getTime() || "1d",
  });
};
