import { z } from 'zod'

/**
 * ─── Schemas de autenticação ───────────────────────────────────────
 *
 * Toda entrada de formulário/Server Action de auth passa por aqui.
 * Mantemos as mensagens em PT-BR no próprio schema porque elas vão
 * direto para o usuário (única locale por enquanto).
 * ───────────────────────────────────────────────────────────────────
 */

export const emailSchema = z
  .string()
  .min(1, 'Informe seu email.')
  .email('Email inválido.')

export const passwordSchema = z
  .string()
  .min(6, 'A senha precisa de no mínimo 6 caracteres.')
  .max(128, 'Senha muito longa.')

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
export type SignInInput = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
export type SignUpInput = z.infer<typeof signUpSchema>

export const resetPasswordRequestSchema = z.object({
  email: emailSchema,
})
export type ResetPasswordRequestInput = z.infer<typeof resetPasswordRequestSchema>

export const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirm: z.string().min(1, 'Confirme a nova senha.'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'As senhas não coincidem.',
    path: ['confirm'],
  })
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
