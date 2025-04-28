"use client";

import { usePathname } from "next/navigation";
import Headers from "./headers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeader = pathname === "/user/login" || pathname === "/user";

  return (
    <div className={poppins.className}>
      {!hideHeader && <Headers />}
      {children}
    </div>
  );
}
