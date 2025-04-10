import {
  registerSchema,
  RegisterSchemaType,
} from "@/components/AuthForm/schemas";
import { axiosInstance } from "@/lib/axiosInstance";
import { signIn } from "next-auth/react";
import { ZodIssue } from "zod";

type Props = {
  data: RegisterSchemaType;
  setErrors?: (errors: ZodIssue[]) => void;
};

export const onRegister = async ({ data, setErrors }: Props) => {
  const validation = registerSchema.safeParse(data);

  if (!validation.success) {
    console.log(validation.error);

    setErrors?.(validation.error.issues);
    throw new Error(validation.error.message);
  }

  const validatedData = validation.data;

  const res = await axiosInstance.post("/auth/register", data);
  if (res.status !== 200) {
    throw new Error(res.data.error);
  }

  return await signIn("credentials", {
    ...validatedData,
    redirect: true,
    callbackUrl: "/",
  });
};
