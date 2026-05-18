import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TanstackProvider from "./components/TanStackProvider/TanStackProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Service for renting cars",
  icons: {
    icon: "/car-label.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <TanstackProvider>
          <Header />
          {children}

          <ToastContainer
            position="top-center"
            autoClose={5000}
            limit={5}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Zoom}
          />
        </TanstackProvider>
      </body>
    </html>
  );
}
