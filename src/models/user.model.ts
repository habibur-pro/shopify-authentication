import mongoose, { Schema, model } from "mongoose";
export type TUser = {
  name: string;
  email: string;
  shop: string;
  access_token: string;
  scope: string;
};

const UserSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  shop: {
    type: String,
    required: [true, "shop is required"],
  },
  access_token: {
    type: String,
    required: [true, "access token is required"],
  },
  scope: {
    type: String,
    required: [true, "scope token is required"],
  },
});

export const User = mongoose.models.user || model<TUser>("user", UserSchema);
