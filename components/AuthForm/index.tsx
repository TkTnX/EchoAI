"use client";

import { Button } from "../ui/Button";
import { ProviderButtons } from "../ProviderButtons";
import Link from "next/link";
import { ZodIssue } from "zod";
import { LoginSchemaType, RegisterSchemaType } from "./schemas";
import { useState } from "react";
import { FormInput } from "../ui/FormInput";
import { toast } from "react-toastify";
import { onLogin } from "@/helpers/login";
import { onRegister } from "@/helpers/register";
import { useRouter } from "next/navigation";

type Props = {
  type: "login" | "register";
};

export const AuthForm = ({ type }: Props) => {
  const router = useRouter();
  const [errors, setErrors] = useState<[] | ZodIssue[]>([]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget));
      let res;
      if (type === "login") {
        res = await onLogin({ data: data as LoginSchemaType, setErrors });
      } else {
        res = await onRegister({ data: data as RegisterSchemaType, setErrors });
      }

      if (!res?.ok) {
        toast.error("Неверные данные или пароль!");
        throw new Error(res?.error || "Error!");
      }

      toast.success("Успешно!");
      return router.push("/");
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
