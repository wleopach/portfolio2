"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { basePath } from '@/lib/data';
import { slideIn, staggerContainer } from '@/lib/motion';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simple mock since emailjs is not configured
    setTimeout(() => {
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible.');
      setForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      id="contact"
      className="py-20 w-full"
    >
      <div className="px-8 xl:px-24 2xl:px-40 w-full">
        <motion.div
            variants={slideIn('left', 'tween', 0.2, 1)}
            className="bg-jetLight p-8 rounded-2xl w-full"
        >
          <p className="sm:text-[18px] text-[16px] text-taupe uppercase tracking-wider font-semibold">Get in touch</p>
          <h3 className="text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px]">Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-6 font-poppins"
          >
            <label className="flex flex-col">
              <span className="text-timberWolf font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-eerieBlack py-4 px-6 placeholder:text-taupe text-timberWolf rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-timberWolf font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-eerieBlack py-4 px-6 placeholder:text-taupe text-timberWolf rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-timberWolf font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's your message?"
                className="bg-eerieBlack py-4 px-6 placeholder:text-taupe text-timberWolf rounded-lg outline-none border-none font-medium resize-none"
              />
            </label>

            <button
              type="submit"
              className="flex justify-center gap-4 text-timberWolf font-bold font-beckman items-center py-5 px-8 rounded-[10px] bg-eerieBlack hover:bg-taupe hover:text-eerieBlack transition duration-[0.2s] ease-in-out w-fit"
            >
              {loading ? 'Sending...' : 'Send'}
              <Image
                src={`${basePath}/assets/icons/send.png`}
                alt="send"
                width={26}
                height={26}
                className="object-contain"
              />
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
