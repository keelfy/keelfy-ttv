import HeaderMenu from "@/components/HeaderMenu";
import FilmList from "@/components/films/FilmList";
import MyAppShellFooter from "@/components/shell/MyAppShellFooter";
import MyAppShellHeader from "@/components/shell/MyAppShellHeader";
import MyAppShellMain from "@/components/shell/MyAppShellMain";
import { createClient } from "@/utils/supabase/server";
import {
    Anchor,
    AppShell,
    Container,
    Flex,
    Group,
    Text,
    Title,
} from "@mantine/core";
import { cookies } from "next/headers";
import Image from "next/image";
import AuthButton from "../components/AuthButton";

const Index = async () => {
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

    return (
        <AppShell header={{ height: 60 }} padding="md">
            <MyAppShellHeader>
                <Container h="100%">
                    <Flex justify="space-between" align="center" h="100%">
                        <Group>
                            <Image
                                src="/logo.gif"
                                alt="Logo"
                                width={60}
                                height={60}
                            />
                            <HeaderMenu />
                        </Group>
                        {isSupabaseConnected && <AuthButton />}
                    </Flex>
                </Container>
            </MyAppShellHeader>

            <MyAppShellMain>
                <Container h="100%">
                    <Title order={1}>Заказанные фильмы</Title>
                    <FilmList py="md" />
                </Container>
            </MyAppShellMain>

            <MyAppShellFooter>
                <Flex align="center" justify="center">
                    <Text p="xs">
                        Created by{" "}
                        <Anchor
                            href="https://twitch.tv/keelfy"
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
    );
};

export default Index;
