import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"
import Providers from "@/components/shared/providers";
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google";
import '../style/globals.css'

export const metadata: Metadata = {
  title: "discordbots | Public botlist",
  description: "Browse hundreds of bots made for your community.",
  icons: ["/icon.png"]
}

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en" id="html_element">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          font.variable
        )}
      >
        <Providers>
          <Header />
          <main className="py-3 px-8 lg:px-28 mt-24">
            {children}
          </main>
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
