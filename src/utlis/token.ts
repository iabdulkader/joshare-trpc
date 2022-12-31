import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { User } from '../types';

export const getUser = (): User | null => {
    let token = cookie.get("token")
    if (token) {
        return decodeUser(token)
    }
    return null;
}

export const decodeUser = (token: string): User | null => {
    if (token) {
        const decodedUser = jwtDecode<User>(token);
        return {
            pin: decodedUser.pin,
            expire: new Date(decodedUser.expire as Date)
        };
    }
    return null;
}

export const setUser = (token: string) => {
    cookie.set("token", token, { expires: 1 });
}

export const removeUser = () => {
    cookie.remove("token");
}

export const signToken = (user: User) => {
    return jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    });
}