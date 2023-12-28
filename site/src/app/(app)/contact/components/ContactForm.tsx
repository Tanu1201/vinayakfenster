'use client'

import { Button } from '@/components/UI/Button'

export const ContactForm = () => {
  return (
    <form
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
      onSubmit={e => e.preventDefault()}
    >
      <input
        className="shadow-md outline-none rounded-md border p-2"
        type="text"
        placeholder="Your Name"
      ></input>
      <input
        className="shadow-md outline-none rounded-md border p-2"
        type="email"
        placeholder="Email"
      ></input>
      <input
        className="shadow-md outline-none rounded-md border p-2"
        type="tel"
        placeholder="Phone"
      ></input>
      <input
        className="shadow-md outline-none rounded-md border p-2"
        placeholder="Company Name"
      ></input>
      <textarea
        placeholder="Message"
        className="col-span-2 shadow-md outline-none rounded-md border p-2"
      ></textarea>
      <div>
        <Button>Send Message</Button>
      </div>
    </form>
  )
}
