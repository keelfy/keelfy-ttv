import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { GeistSans } from "geist/font/sans";
import { Montserrat } from "next/font/google";
import { ReactNode } from "react";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "KEELFY TTV",
    description: "keelfy tools",
};

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

const theme = createTheme({
    ...montserrat.style,
    primaryColor: "violet",
});

export default function RootLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={GeistSans.className}>
            <head>
                <ColorSchemeScript />
            </head>
            <body className="bg-background text-foreground">
                <main className="min-h-screen flex flex-col items-center">
                    <MantineProvider theme={theme}>{children}</MantineProvider>
                </main>
            </body>
        </html>
    );
}
