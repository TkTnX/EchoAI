"use server";

import { signIn } from "./auth/[...nextauth]/route";
import { AxiosError } from "axios";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.message;
    }
    throw error;
  }
}
