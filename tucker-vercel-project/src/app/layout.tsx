import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BikeShare - Lease & Test Premium Bikes",
  description: "Discover your perfect bike through flexible leasing. Test different brands and styles before you buy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}