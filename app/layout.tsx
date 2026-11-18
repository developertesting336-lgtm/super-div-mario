import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Super Mario Bros. - Play Online | Classic HTML5 NES Game",
  description:
    "Play the timeless 1985 Super Mario Bros. in your web browser. Featuring all 32 original NES levels, random map generator, level editor, cheats, and retro sound effects.",
  icons: {
    icon: "/mario/Theme/Mario.gif",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0b0c10] text-[#ededed] antialiased">
        {children}
      </body>
    </html>
  );
}
