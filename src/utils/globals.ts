import { CookieOptions } from "express";

export const expiresIn = "2h";
export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};
