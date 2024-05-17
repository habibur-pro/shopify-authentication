"use client";

import { signIn } from "next-auth/react";

const page = () => {
  const handleLogin = () => {
    alert("alert");
    signIn("credentials", { email: "habbiur", password: "#@Habib1122" });
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      login success
      <button
        onClick={handleLogin}
        className="px-3 py-2 bg-blue-500 rounded text-white my-3"
      >
        Login
      </button>
    </div>
  );
};

export default page;
