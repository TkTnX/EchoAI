"use client";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      className="text-center bg-red-500 text-[#fff] rounded-lg w-full mt-4 py-2 px-4 hover:opacity-80 transition"
      onClick={() => signOut()}
    >
      Выйти
    </button>
  );
};
