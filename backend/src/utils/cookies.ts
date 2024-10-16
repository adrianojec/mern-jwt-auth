import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

type AuthCookiesParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const secure = NODE_ENV !== "development";

const defaultCookieOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

const getAccessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  expires: fifteenMinutesFromNow(),
};

const getRefreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  expires: thirtyDaysFromNow(),
  path: "/auth/refresh",
};

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: AuthCookiesParams) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions)
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions);
