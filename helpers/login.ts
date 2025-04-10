import { loginSchema, LoginSchemaType } from "@/components/AuthForm/schemas";
import { signIn } from "next-auth/react";
import { ZodIssue } from "zod";

type Props = {
  data: LoginSchemaType;
  setErrors?: (errors: ZodIssue[]) => void;
};

export const onLogin = async ({ data, setErrors }: Props) => {
  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    setErrors?.(validation.error.issues);
    throw new Error(validation.error.message);
  }

  const validatedData = validation.data;
  return await signIn("credentials", {
    ...validatedData,
    redirect: false,
    callbackUrl: "/",
  });
};
