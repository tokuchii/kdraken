import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kdraken_",
  description:
    "Full-Stack Developer building clean, performant web applications. Based in Laguna, Philippines.",
  keywords: ["developer", "full-stack", "portfolio", "Next.js", "React"],
  openGraph: {
    title: "kdraken_",
    description:
      "Full-Stack Developer building clean, performant web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={4000}
            toastOptions={{
              style: {
                background: "var(--color-surface)",
                color: "var(--color-text-1)",
                border: "1px solid var(--color-border)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
