import "@ui/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { CameraProvider } from "./components/camera/camera-provider";

export const metadata: Metadata = {
  title: "Rotstift Webapp",
  description: "AI Assistant for personalized essay feedback",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CameraProvider>{children}</CameraProvider>
        </body>
    </html>
  );
}
