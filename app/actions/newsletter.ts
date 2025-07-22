'use server'

import { z } from 'zod'
import { env } from '@/lib/env'

const subscribeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
})

export async function subscribeToNewsletter(
  prevState: any,
  formData: FormData
) {
  const rawData = {
    name: formData.get('name'),
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

  const { name, email } = validatedFields.data

  try {
    const response = await fetch('https://api.useplunk.com/v1/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.PLUNK_API_KEY}`,
      },
      body: JSON.stringify({
        event: 'newsletter-subscribe',
        email: email,
        data: {
          name: name,
        },
      }),
    })

    if (!response.ok) {
      console.error('Plunk API error:', await response.text())
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