import { Footer, Navbar } from "@components/index";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Dribbble Knock Off",
  description: "Dribbble clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />

          <main>
            {children}
          </main>

          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
