import type { Metadata } from "next";
import "./globals.css";
import "moment/locale/vi";

export const metadata: Metadata = {
  title: "Đếm ngày chúng ta bên nhau",
  description: "1 2 3 4 5 6 7 ngày trôi...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`bg-gray-900 font-sans`}>{children}</body>
    </html>
  );
}
