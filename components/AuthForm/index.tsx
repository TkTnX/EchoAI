"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/Button";
import { ProviderButtons } from "../ProviderButtons";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { ZodIssue } from "zod";
import { loginSchema, registerSchema } from "./schemas";
import { useState } from "react";
import { FormInput } from "../ui/FormInput";
import { toast } from "react-toastify";

type Props = {
  type: "login" | "register";
};

export const AuthForm = ({ type }: Props) => {
  const [errors, setErrors] = useState<[] | ZodIssue[]>([]);
  // TODO: Вынести или упростить эту функцию
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget));
      let res;
      if (type === "login") {
        const validation = loginSchema.safeParse(data);

        if (!validation.success) {
          setErrors(validation.error.issues);
          throw new Error(validation.error.message);
        }

        const validatedData = validation.data;
        res = await signIn("credentials", {
          ...validatedData,
          redirect: false,
          callbackUrl: "/",
        });
      } else {
        const validation = registerSchema.safeParse(data);

        if (!validation.success) {
          console.log(validation.error);

          setErrors(validation.error.issues);
          throw new Error(validation.error.message);
        }

        const validatedData = validation.data;

        const res = await axiosInstance.post("/auth/register", data);
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }

        await signIn("credentials", {
          ...validatedData,
          redirect: true,
          callbackUrl: "/",
        });
      }

      if (!res?.ok) {
        toast.error("Неверные данные или пароль!");
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
          <FormInput
            type="text"
            name="username"
            placeholder="Имя пользователя"
            errors={errors}
          />
        )}

        <FormInput
          type="email"
          placeholder="Адрес электронной почты"
          name="email"
          errors={errors}
        />
        <FormInput
          errors={errors}
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
        {errors.find((issue) => issue.path[0] === "submit") && (
          <p className="text-red-500 text-xs">
            {errors.find((issue) => issue.path[0] === "submit")?.message}
          </p>
        )}
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
