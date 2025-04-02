"use client";
import { useActionState } from "react";
import { authenticate } from "../api/actions";

const AuthorizePage = () => {
  const [error, formAction, isPending] = useActionState(authenticate, undefined);
  return (
    <div className="">
      <h2>С возвращением (Регистрация)</h2>
      <form action={formAction}>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button disabled={isPending} type="submit">
          Submit
        </button>
        {error && <p>error: {error}</p>}
      </form>
    </div>
  );
};

export default AuthorizePage;
