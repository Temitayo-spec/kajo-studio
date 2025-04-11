import { Anton_SC, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "@/components/layout";
import { ViewTransitions } from "next-view-transitions";

const anton_sc = Anton_SC({
  variable: "--font-anton-sc",
  subsets: ["latin"],
  weight: ["400"],
});

const gambetta = localFont({
  src: [
    {
      path: "../../public/fonts/Gambetta-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-gambetta",
});
``
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${anton_sc.variable} ${montserrat.className} ${gambetta.variable} antialiased`}
        >
          <Layout>{children}</Layout>
        </body>
      </html>
    </ViewTransitions>
  );
}
