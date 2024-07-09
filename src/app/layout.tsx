import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "ChatBuddy | Home",
  description: "Welcome to the ChatBuddy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
          <body>
              <Providers>
                  {children}
              </Providers>
          </body>
      </html>
  );
}
