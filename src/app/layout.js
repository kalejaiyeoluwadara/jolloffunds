import "./globals.css";
import AppProvider from "./context";

export const metadata = {
  title: "JollofFunds",
  description: "Na your love, na our Jollof!",
  icons: {
    light: "/assets/hero.jpg",
    dark: "/assets/hero.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppProvider>
        <body className={` overflow-x-hidden antialiased`}>{children}</body>
      </AppProvider>
    </html>
  );
}
