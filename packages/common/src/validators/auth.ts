import z from "zod"

export const usernameValidator = z
  .string()
  .min(12, "ФИО не может быть меньше 12 символов")
  .max(50, "ФИО не может быть больше 50 символов")

export const inviteCodeValidator = z.string().length(6, "Неверный код")
