import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import AuthButton from "@/components/AuthButton";
import HeaderMenu from "@/components/HeaderMenu";
import MyAppShellFooter from "@/components/shell/MyAppShellFooter";
import MyAppShellHeader from "@/components/shell/MyAppShellHeader";
import MyAppShellMain from "@/components/shell/MyAppShellMain";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { createClient } from "@/utils/supabase/server";
import {
    Anchor,
    AppShell,
    ColorSchemeScript,
    Container,
    Flex,
    MantineProvider,
    Text,
    createTheme,
} from "@mantine/core";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
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

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
    const cookieStore = cookies();

    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient(cookieStore);
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className="bg-background text-foreground">
                <main className="min-h-screen flex flex-col items-center">
                    <MantineProvider theme={theme}>
                        <AppShell
                            header={{ height: 60 }}
                            footer={{ height: 40 }}
                            padding="md"
                        >
                            <MyAppShellHeader>
                                <Container h="100%">
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        h="100%"
                                    >
                                        <HeaderMenu />
                                        <Flex align="center" gap="md">
                                            {isSupabaseConnected && (
                                                <AuthButton
                                                    logged={user !== null}
                                                />
                                            )}
                                            <ThemeButton />
                                        </Flex>
                                    </Flex>
                                </Container>
                            </MyAppShellHeader>

                            <MyAppShellMain>
                                <Container h="100%">{children}</Container>
                            </MyAppShellMain>

                            <MyAppShellFooter>
                                <Flex align="center" justify="center" h="100%">
                                    <Text>
                                        Created by&nbsp;
                                        <Anchor
                                            href="https://keelfy.dev"
                                            target="_blank"
                                            className="font-bold hover:underline"
                                            rel="noreferrer"
                                        >
                                            keelfy
                                        </Anchor>
                                    </Text>
                                </Flex>
                            </MyAppShellFooter>
                        </AppShell>
                    </MantineProvider>
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
