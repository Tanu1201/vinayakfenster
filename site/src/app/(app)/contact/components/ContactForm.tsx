'use client'

import { Button } from '@/components/UI/Button'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { sendEnquiry } from '../actions'

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <form
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
      onSubmit={async e => {
        setIsSubmitting(true)
        e.preventDefault()
        const form = e.currentTarget as any
        const name = form.name.value
        const email = form.email.value
        const phone = form.phone.value
        const company = form.company.value
        const message = form.message.value

        if (!name || !email || !phone || !message) {
          alert('Please fill all the required fields')
          return
        }

        try {
          await sendEnquiry({
            name,
            email,
            phone,
            company,
            message
          })
          alert('Your message has been sent successfully.')
        } catch (error) {
          console.error(error)
          alert('Something went wrong. Please try again later.')
        }
        setIsSubmitting(false)
      }}
    >
      <input
        className="shadow-md outline-none rounded-md border p-2"
        type="text"
        required
        name="name"
        placeholder="Your Name"
      />
      <input
        className="shadow-md outline-none rounded-md border p-2"
        type="email"
        name="email"
        required
        placeholder="Email"
      />
      <input
        className="shadow-md outline-none rounded-md border p-2"
        type="tel"
        name="phone"
        required
        placeholder="Phone"
      />
      <input
        className="shadow-md outline-none rounded-md border p-2"
        name="company"
        placeholder="Company Name"
      />
      <textarea
        placeholder="Message"
        required
        name="message"
        className="col-span-2 shadow-md outline-none rounded-md border p-2"
      />

      <div>
        <Button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 justify-center"
          >
            Send Message
            {isSubmitting ? (
              <CgSpinner className="animate-spin" size={24} />
            ) : null}
          </button>
        </Button>
      </div>
    </form>
  )
}
