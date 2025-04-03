"use client";
import { signIn } from "next-auth/react";
const AuthorizePage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget));
      console.log(data);
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!res?.ok) {
        throw new Error(res?.error || "Error!");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h2>С возвращением (Регистрация)</h2>
      {/* TODO: Форму в отедльный компонент */}
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => signIn("github", { callbackUrl: "/", redirect: true })}
      >
        Github
      </button>
    </div>
  );
};

export default AuthorizePage;
