import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "./context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JollofFunds",
  description: "Na your love, na our Jollof!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
        >
          {children}
        </body>
      </AppProvider>
    </html>
  );
}
