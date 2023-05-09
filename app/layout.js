import './globals.css'
import Providers from './providers';

import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className = {`${montserrat.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
