import verifyHmac from "@/lib/verifyHmac";
import { NextApiRequest } from "next";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const queryParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    console.log({ queryParams });
    const shop = req.nextUrl.searchParams.get("shop");
    const timestamp = req.nextUrl.searchParams.get("timestamp") as string;

    const isVerified = verifyHmac(queryParams);
    console.log({ isVerified });

    if (!isVerified) {
      return NextResponse.json(
        { success: false, message: "faild auth" },
        { status: 400 }
      );
    }
    const state = Buffer.from(crypto.randomUUID()).toString("base64");
    const client_id = process.env.SHOPIFY_CLIENT_ID;
    const redirect_uri = "http://localhost:3000/api/auth/redirect";
    const scopes = "read_products, write_products";
    const installUrl =
      `https://${shop}/admin/oauth/authorize?client_id=${client_id}` +
      "&scope=" +
      scopes +
      "&state=" +
      state +
      "&redirect_uri=" +
      redirect_uri +
      "&grant_options[]=per-user";

    return NextResponse.redirect(installUrl);
  } catch (error) {
    console.log("error=>", error);
    return NextResponse.json(
      { success: false, message: "auth failed" },
      { status: 500 }
    );
  }
};
