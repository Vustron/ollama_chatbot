"use client"

// utils
import Image from "next/image"

const Hero = () => {
  return (
    <section className="mt-24">
      <div className="relative w-full">
        <div className="bg-gradient-to-br from-green-950/[0.8] to-blue-950/[0.7] border border-green-900 rounded-lg p-1 aspect-square overflow-hidden absolute left-0 sm:left-1/2 sm:-translate-x-1/2 -top-12">
          <Image
            src="/images/vustronchan.jpg"
            alt="Vustron-chan avatar"
            className="size-8"
            width={32}
            height={32}
          />
        </div>
      </div>
      <h1 className="text-transparent sm:text-center font-bold sm:text-5xl text-4xl bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-black/[0.6]">
        Vustron-chan Chatbot
      </h1>
      <p className="mt-1 text-white/[0.7] sm:text-center text-start">
        A chatbot made using Ollama 3.1 and Next.js
      </p>
    </section>
  )
}

export default Hero
