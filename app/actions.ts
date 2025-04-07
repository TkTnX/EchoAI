"use server";

import { axiosInstance } from "@/lib/axiosInstance";

export interface PrevStateInterface {
  error: null | string;
  loading: boolean;
}

export const AddPrompt = async (
  prevState: PrevStateInterface,
  formData: FormData
) => {
  try {
    prevState.loading = true;
    const { chatId, message, userId } = Object.fromEntries(formData);

    await axiosInstance.post("/messages", {
      message,
      chatId,
      userId,
    });

    return { error: null, loading: false };
  } catch (error) {
    console.log(error);
    return { error: null, loading: false };
  }
};
