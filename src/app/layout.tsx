import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Agent Desktop",
  description: "DXC Style - Smart Agent Desktop Prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
