import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from '@/components/providers/session-provider'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: "おとなりさん - 音楽でつながる友達コミュニティ",
  description: "好きなアーティストや音楽の趣味が合う友達を見つけて、新しい音楽体験を共有しよう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
