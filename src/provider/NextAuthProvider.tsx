"use client";
export type TNextAuthProvider = {
  children: ReactNode;
};
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
const NextAuthProvider = ({ children }: TNextAuthProvider) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
