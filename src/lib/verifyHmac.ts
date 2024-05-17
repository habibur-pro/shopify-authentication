import crypto from "crypto";

export type THmacParams = {
  [key: string]: string | undefined; // Allow additional parameters dynamically
};

const verifyHmac = (params: THmacParams): boolean => {
  const { hmac, ...restParams } = params;
  console.log(hmac, { ...restParams });
  if (!hmac) {
    console.error("Missing HMAC");
    return false;
  }

  const nextAuthSecret = process.env.SHOPIRY_CLIENT_SECRET;
  if (!nextAuthSecret) {
    console.error("Missing SHOPIRY_CLIENT_SECRET");
    return false;
  }

  // Construct the message string dynamically, sorting keys for consistency
  const message = Object.entries(restParams)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const digest = crypto
    .createHmac("sha256", nextAuthSecret)
    .update(message)
    .digest("hex");

  if (hmac === digest) {
    return true;
  } else {
    console.error("HMAC verification failed", { hmac, digest, message });
    return false;
  }
};

export default verifyHmac;
