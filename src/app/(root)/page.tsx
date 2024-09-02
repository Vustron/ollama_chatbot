// components
import Client from "@/app/(root)/_components/client"
import { BlurFade } from "@/components/shared/blur-fade"
import { Lights } from "@/components/shared/lights"

// types
import type { Metadata } from "next/types"

// meta data
export const metadata: Metadata = {
  title: "Vustron-chan Chatbot",
}

export default function RootPage() {
  return (
    <main className="flex size-full flex-col items-center justify-center bg-grid-white/[0.03] bg-black relative">
      <BlurFade delay={0.25} inView className="relative z-10">
        <Client />
      </BlurFade>
      <div
        className={
          "absolute bottom-0 left-0 w-full h-full z-0 animate-appear opacity-0 pointer-events-none"
        }
      >
        <Lights />
      </div>
    </main>
  )
}
