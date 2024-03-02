import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import classNames from "classnames";

const inter = Inter({
  weight: ["300", "400", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: ["300", "400", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const combinedClassNames = classNames(inter.className, poppins.className);

  return (
    <html lang="en">
      <body className={combinedClassNames}>{children}</body>
    </html>
  );
}
