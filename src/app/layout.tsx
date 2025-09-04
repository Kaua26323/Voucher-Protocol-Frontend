import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { VoucherProvider } from "@/providers/voucherContext";

export const metadata: Metadata = {
  title: "Voucher Protocol",
  description: "Gerenciamente e controle de voucher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            style:{
              backgroundColor: "#f1f1f1",
              color: "#131313",
              borderColor: "rgba(255,255,255, 0.5)"
            }
          }}
        />
        <VoucherProvider>
          {children}
        </VoucherProvider>
      </body>
    </html>
  );
}
