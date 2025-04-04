"use client";

import { signIn } from "next-auth/react";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import { ProviderButtons } from "../ProviderButtons";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";

type Props = {
  type: "login" | "register";
};

export const AuthForm = ({ type }: Props) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget));
      let res;
      if (type === "login") {
        res = await signIn("credentials", {
          ...data,
          redirect: true,
          callbackUrl: "/",
        });
      } else {
        const res = await axiosInstance.post("/auth/register", data);
        if (res.status !== 200) {
          console.log(res.data);
          throw new Error(res.data.error);
        }

        await signIn("credentials", {
          ...data,
          redirect: true,
          callbackUrl: "/",
        });
      }

      if (!res?.ok) {
        throw new Error(res?.error || "Error!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col w-full  justify-center items-center  gap-4"
        onSubmit={onSubmit}
      >
        <h2 className="font-bold text-3xl mb-10">
          {type === "login" ? "С возвращением" : "Добро пожаловать"}
        </h2>

        {type === "register" && (
          <Input
            className="outline-none"
            type="text"
            placeholder="Имя пользователя"
            name="username"
          />
        )}
        <Input
          className="outline-none"
          type="email"
          placeholder="Адрес электронной почты"
          name="email"
        />
        <Input
          className="outline-none"
          type="password"
          placeholder="Пароль"
          name="password"
        />
        <p className="text-xs ">
          {type === "login" ? (
            <>
              <span className="opacity-60">У вас нет учётной записи?</span>{" "}
              <Link className="hover:opacity-80 transition" href={"/register"}>
                Зарегистрироваться
              </Link>
            </>
          ) : (
            <>
              <span className="opacity-60">Уже есть аккаунт?</span>{" "}
              <Link className="hover:opacity-80 transition" href={"/login"}>
                Войти
              </Link>
            </>
          )}
        </p>
        <Button
          className="text-center justify-center"
          blurPosition="right-0 bottom-0"
          type="submit"
        >
          {type === "login" ? "Вход" : "Регистрация"}
        </Button>
      </form>
      <div className="flex items-center gap-2 w-full">
        <div className="h-0.5 bg-bgLight flex-1" />
        <p>или</p>
        <div className="h-0.5 bg-bgLight flex-1" />
      </div>
      <ProviderButtons />
    </>
  );
};
