import { connectDB } from "@/lib/connectDB";
import { getAccessToken } from "@/lib/getAccessToken";
import verifyHmac from "@/lib/verifyHmac";
import { TUser, User } from "@/models/user.model";
import { TTokenData } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export type TokenData = {};

export const GET = async (req: NextRequest) => {
  console.log("hit redirect");
  try {
    await connectDB();
    const code = req.nextUrl.searchParams.get("code") as string;
    const hmac = req.nextUrl.searchParams.get("hmac") as string;
    const host = req.nextUrl.searchParams.get("host") as string;
    const shop = req.nextUrl.searchParams.get("shop") as string;
    const state = req.nextUrl.searchParams.get("state") as string;
    const queryParams = Object.fromEntries(
      req.nextUrl.searchParams.entries()
    ) as {
      [key: string]: string;
    };

    console.log(queryParams);
    const timestamp = req.nextUrl.searchParams.get("timestamp") as string;
    const isVerified = verifyHmac(queryParams);
    console.log("veriy from redirect", isVerified);
    const token = (await getAccessToken({ shop, code })) as TTokenData;
    const associated_user = token.associated_user;
    const existUser = await User.findOne({ shop: shop });
    if (existUser) {
      await User.findOneAndUpdate(
        { shop: shop },
        { access_token: token.access_token }
      );
      return NextResponse.redirect(
        `http://localhost:3000?user=${existUser.id}&access_token=${existUser.access_token}`
      );
    }

    const userData: Partial<TUser> = {
      name: associated_user.first_name,
      email: associated_user.email,
      shop,
      scope: token.scope,
      access_token: token.access_token,
    };
    const newUser = await User.create(userData);

    return NextResponse.redirect(
      `http://locahost:3000?user=${newUser.id}&access_token=${existUser.access_token}`
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
