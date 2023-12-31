import "./globals.css";
import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { Toaster } from "react-hot-toast";

import HeaderBar from "@/components/header-bar";

export const metadata: Metadata = {
  title: "Victory Points",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <head></head>
        <body>
          <Toaster position="bottom-left" />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="vp-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <HeaderBar />
              <div className="p-1">{children}</div>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
