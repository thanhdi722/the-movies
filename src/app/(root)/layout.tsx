"use client";
import type { ReactNode } from 'react';
import Header from "@/components/layout/header";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthProvider";
import Footer from '@/components/layout/footer';



export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="vi" className="dark">
      <Provider store={store}>
        <AuthProvider>
          <body className="min-h-screen bg-black text-white antialiased">
            <Header />
            {children}
            <Footer />
            <ToastContainer />
          </body>
        </AuthProvider>
      </Provider>
    </html>
  )
}

