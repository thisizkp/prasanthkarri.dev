'use server'

import { z } from 'zod'
import { env } from '@/lib/env'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function subscribeToNewsletter(
  prevState: any,
  formData: FormData
) {
  const rawData = {
    email: formData.get('email'),
  }

  const validatedFields = subscribeSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      error: 'Invalid form data. Please check your inputs.',
      success: false,
      message: '',
    }
  }

  const { email } = validatedFields.data

  try {
    const response = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email,
        type: 'regular',
      }),
    })

    if (response.status === 409) {
      return {
        success: true,
        message: "You're already subscribed!",
        error: '',
      }
    }

    if (!response.ok) {
      console.error('Buttondown API error:', await response.text())
      return {
        error: 'Failed to subscribe. Please try again later.',
        success: false,
        message: '',
      }
    }

    return {
      success: true,
      message: 'Thanks for subscribing!',
      error: '',
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      error: 'Network error. Please try again.',
      success: false,
      message: '',
    }
  }
}