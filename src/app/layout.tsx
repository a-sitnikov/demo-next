import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Loader } from "@/ui/loader";
import AppProviders from "./_app-providers";
import AntdProvider from "./_app-providers/antd";
import { YandexMetrika } from "./_app-providers/yandex-metrika";
import { AppHeader } from "./_components/app-header";
import "./globals.css";

const font = Inter({
  variable: "--default-font",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "e.way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <YandexMetrika />
      <body className={font.className}>
        <AppProviders>
          <div className="flex flex-col items-center">
            <AppHeader />
            <div className="max-w-screen-xl w-full grow">{children}</div>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
