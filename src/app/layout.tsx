import BetaBanner from "@/components/shared/common/beta-banner";
import Footer from "@/components/shared/layout/footer"
import Header from "@/components/shared/layout/header"
import Providers from "@/components/shared/providers";
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next'
import { Sora as FontSans } from "next/font/google";
import '../style/globals.css'

export const metadata: Metadata = {
  title: "discordbots | Public botlist",
  description: "Browse hundreds of bots made for your community.",
  icons: ["/favicon.ico"]
}

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const viewport: Viewport = {
  themeColor: "#6271fe",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en" id="html_element">
      <body
        className={cn(
          "min-h-screen flex flex-col bg-background font-sans antialiased",
          font.variable
        )}
      >
        <Providers>
          <BetaBanner />
          <Header />
          <main className="py-3 px-8 lg:px-28 mt-24">
            {children}
          </main>
          <Toaster className="select-none active:cursor-grabbing cursor-pointer" position="top-right" richColors />
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
