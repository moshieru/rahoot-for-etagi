import z from "zod"

export const usernameValidator = z
  .string()
  .min(6, "Ник не может быть меньше 6 символов")
  .max(20, "Ник не может быть больше 20 символов")

export const inviteCodeValidator = z.string().length(6, "Неверный код")
