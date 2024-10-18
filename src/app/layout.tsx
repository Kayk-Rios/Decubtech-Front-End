import type { Metadata } from "next";
import {Montserrat } from "next/font/google"
import "./globals.css";

 

export const metadata: Metadata = {
  title: "DecubTech",
  description: "Site de Decubito",
};

const font = Montserrat({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
  className={font.className}
      >
        {children}
      </body>
    </html>
  );
}
