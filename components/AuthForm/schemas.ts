import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Длина имени минимум 3 символа"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Длина пароля минимум 6 символов"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
