'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { subscribeToNewsletter } from '@/app/actions/newsletter'

const initialState = {
  message: '',
  error: '',
  success: false,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-gray-700 dark:bg-zinc-600 border border-gray-700 dark:border-zinc-600 rounded-md hover:bg-gray-900 dark:hover:bg-zinc-500 hover:border-gray-900 dark:hover:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
    >
      {pending ? 'Subscribing...' : 'Subscribe'}
    </button>
  )
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState)
  
  return (
    <aside aria-labelledby="newsletter-heading" className="mt-16 mb-16 border-t border-gray-200 dark:border-zinc-700 pt-8">
      <div className="max-w-md">
        <h2 id="newsletter-heading" className="text-lg font-medium text-gray-900 dark:text-zinc-50">Stay updated</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
          Get notified when I publish something new.
        </p>
        
        <form action={formAction} className="mt-6 space-y-3">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-sm bg-white dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-invalid={state?.error ? 'true' : undefined}
            aria-describedby={state?.error ? 'email-error' : undefined}
          />
        </div>
        
        <SubmitButton />
        
        {state?.error && (
          <p id="email-error" role="alert" className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
        )}

        {state?.success && (
          <p role="status" className="text-sm text-green-600 dark:text-green-400">{state.message}</p>
        )}
      </form>
      </div>
    </aside>
  )
}