import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import AuthButton from "@/components/AuthButton";
import BurgerMenu from "@/components/BurgerMenu";
import HeaderMenu from "@/components/HeaderMenu";
import MyAppShell from "@/components/shell/MyAppShell";
import MyAppShellFooter from "@/components/shell/MyAppShellFooter";
import MyAppShellHeader from "@/components/shell/MyAppShellHeader";
import MyAppShellMain from "@/components/shell/MyAppShellMain";
import MyAppShellNavbar from "@/components/shell/MyAppShellNavbar";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { createClient } from "@/utils/supabase/server";
import {
    Anchor,
    ColorSchemeScript,
    Container,
    Flex,
    MantineProvider,
    Stack,
    Text,
    createTheme,
} from "@mantine/core";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import Image from "next/image";
import { ReactNode } from "react";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Планы Кифли",
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
            <body>
                <main>
                    <MantineProvider theme={theme}>
                        <MyAppShell header={{ height: 60 }} padding="md">
                            <MyAppShellHeader>
                                <Container h="100%" visibleFrom="xs">
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        h="100%"
                                    >
                                        <Flex gap="md" align="center">
                                            <Flex
                                                gap="sm"
                                                align="center"
                                                justify="center"
                                            >
                                                <Image
                                                    src="/peepoClap.webp"
                                                    width={30}
                                                    height={30}
                                                    alt="7tv emote"
                                                />
                                                <Anchor
                                                    size="xl"
                                                    fw={700}
                                                    c="violet"
                                                    href="https://twitch.tv/keelfy"
                                                >
                                                    keelfy
                                                </Anchor>
                                            </Flex>
                                            <HeaderMenu />
                                        </Flex>
                                        <Flex align="center" gap="md">
                                            {isSupabaseConnected && (
                                                <>
                                                    <Text fw={700} c="violet">
                                                        {
                                                            user?.user_metadata
                                                                .name
                                                        }
                                                    </Text>
                                                    <AuthButton
                                                        logged={user !== null}
                                                    />
                                                </>
                                            )}
                                            <ThemeButton />
                                        </Flex>
                                    </Flex>
                                </Container>
                                <Flex
                                    w="100%"
                                    hiddenFrom="xs"
                                    justify="space-between"
                                    align="center"
                                    h="100%"
                                    p="md"
                                    gap="md"
                                >
                                    <Flex
                                        gap="sm"
                                        align="center"
                                        justify="center"
                                    >
                                        <Image
                                            src="/peepoClap.webp"
                                            width={30}
                                            height={30}
                                            alt="7tv emote"
                                        />
                                        <Anchor
                                            size="xl"
                                            fw={700}
                                            c="violet"
                                            href="https://twitch.tv/keelfy"
                                        >
                                            keelfy
                                        </Anchor>
                                    </Flex>
                                    <Flex align="center" gap="md">
                                        {user?.user_metadata.name && (
                                            <Text fw={700} c="violet">
                                                {user?.user_metadata.name}
                                            </Text>
                                        )}
                                        <BurgerMenu />
                                    </Flex>
                                </Flex>
                            </MyAppShellHeader>

                            <MyAppShellNavbar hiddenFrom="xs" p="md">
                                <Flex
                                    h="100%"
                                    justify="space-between"
                                    direction="column"
                                >
                                    <Stack gap="md">
                                        <Flex gap="sm" align="center">
                                            <Image
                                                src="/gaming.webp"
                                                width={30}
                                                height={30}
                                                alt="7tv emote"
                                            />
                                            <Anchor href="/games" size="lg">
                                                Игры
                                            </Anchor>
                                        </Flex>
                                        <Flex gap="sm" align="center">
                                            <Image
                                                src="/moviE.webp"
                                                width={30}
                                                height={30}
                                                alt="7tv emote"
                                            />
                                            <Anchor href="/movies" size="lg">
                                                Фильмы
                                            </Anchor>
                                        </Flex>
                                    </Stack>
                                    <Flex
                                        align="center"
                                        justify="space-between"
                                    >
                                        <AuthButton logged={user !== null} />
                                        <ThemeButton />
                                    </Flex>
                                </Flex>
                            </MyAppShellNavbar>

                            <MyAppShellMain>
                                <Container h="100%">{children}</Container>
                            </MyAppShellMain>
                        </MyAppShell>
                    </MantineProvider>
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
