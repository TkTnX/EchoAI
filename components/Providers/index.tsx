"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ToastContainer position="top-center" theme="dark" />
      {children}
    </SessionProvider>
  );
};
