import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/header";
import ReactQueryProvider from "./components/reactQueryProvider";
import Footer from "./components/footer/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "YNXGames",
  description: "Find your next game",
};

const quicksand = Quicksand({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "600", "700"], variable: '--font-quicksand' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.variable}>

      <head>
        <link rel="icon" type="image/x-icon" href="/logo_2.ico" />
      </head>

      <body>
        <ReactQueryProvider>
          <div className="container">
            <Header />
            <main>
              {children}
              <Toaster toastOptions={{ className: "toast" }} position="top-center" reverseOrder={false} />
            </main>
            <Footer />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
