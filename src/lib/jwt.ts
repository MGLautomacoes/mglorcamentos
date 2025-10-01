import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

const SECRET = process.env.JWT_SECRET!;
export function signSession(payload: object, days=7){
  return jwt.sign(payload, SECRET, {expiresIn: `${days}d`});
}
export function verifySession<T=any>(token:string){ return jwt.verify(token, SECRET) as T; }
export function setSessionCookie(token:string){
  cookies().set("mgl_session", token, {httpOnly:true, secure:true, sameSite:"lax", path:"/"});
}
export function clearSession(){ cookies().set("mgl_session","",{maxAge:0,path:"/"}); }
