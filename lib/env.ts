import { z } from 'zod'

const envSchema = z.object({
  BUTTONDOWN_API_KEY: z.string().min(1, 'BUTTONDOWN_API_KEY is required'),
})

function validateEnv() {
  const parsed = envSchema.safeParse(process.env)
  
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:')
    console.error(parsed.error.format())
    throw new Error('Invalid environment variables')
  }
  
  return parsed.data
}

export const env = validateEnv()