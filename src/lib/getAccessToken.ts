import axios from "axios";
export type TAccessTokenPayload = { code: string; shop: string };
export const getAccessToken = async (data: TAccessTokenPayload) => {
  const shopifyClientId = process.env.SHOPIFY_CLIENT_ID;
  const shopifyClientSecret = process.env.SHOPIRY_CLIENT_SECRET;
  try {
    const url = `https://${data.shop}/admin/oauth/access_token?client_id=${shopifyClientId}&client_secret=${shopifyClientSecret}&code=${data.code}`;
    const response = await axios.post(url, {
      code: data.code,
      client_id: shopifyClientId,
      client_secret: shopifyClientSecret,
    });
    const result = await response.data;
    return result;
  } catch (error) {
    console.log("token getting error", error);
  }
};
