import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "Todo App using Next.js and Strapi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}