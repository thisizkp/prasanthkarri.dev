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
      className="px-6 py-2 text-sm font-medium text-white bg-gray-700 border border-gray-700 rounded-md hover:bg-gray-900 hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
    >
      {pending ? 'Subscribing...' : 'Subscribe'}
    </button>
  )
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState)
  
  return (
    <div className="mt-16 mb-16 border-t border-gray-200 pt-8">
      <div className="max-w-md">
        <h3 className="text-lg font-medium text-gray-900">Stay updated</h3>
        <p className="mt-1 text-sm text-gray-600">
          Get notified when I publish something new.
        </p>
        
        <form action={formAction} className="mt-6 space-y-3">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <SubmitButton />
        
        {state?.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}
        
        {state?.success && (
          <p className="text-sm text-green-600">{state.message}</p>
        )}
      </form>
      </div>
    </div>
  )
}