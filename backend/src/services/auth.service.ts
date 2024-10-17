import jwt from "jsonwebtoken";
import VerificationCodeType from "../constants/verificationType";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
import { CreateAccountParams, LoginParams } from "./auth.types";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import appAssert from "../utils/appAssert";
import { CONFLICT } from "../constants/httpStatus";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";

export const createAccount = async ({
  email,
  password,
  userAgent,
}: CreateAccountParams) => {
  const existingUser = await UserModel.exists({ email });

  appAssert(!existingUser, CONFLICT, "Email already in use");

  const user = await UserModel.create({
    email,
    password,
  });

  const userId = user._id;

  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionId = session._id;

  const refreshToken = signToken({ sessionId }, refreshTokenSignOptions);

  const accessToken = signToken({
    userId,
    sessionId,
  });

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  const user = await UserModel.findOne({ email });

  appAssert(user, CONFLICT, "Invalid credentials");

  const userId = user._id;

  const isPasswordValid = await user.comparePassword(password);

  appAssert(isPasswordValid, CONFLICT, "Invalid credentials");

  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({
    ...sessionInfo,
    userId,
  });

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
