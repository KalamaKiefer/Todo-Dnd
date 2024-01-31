import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Todo DnD",
    description: "Created by Kalama Kiefer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body
                className={clsx(inter.className, "bg-mutedBlack min-h-screen")}
            >
                <Header />

                <main>{children}</main>
            </body>
        </html>
    );
}
