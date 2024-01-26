import NavigationPaper from "@/components/home/NavigationPaper";
import { Flex, Stack, Title } from "@mantine/core";
import Image from "next/image";

const IndexPage = async () => {
    return (
        <Stack w="100%">
            <NavigationPaper href="/games">
                <Flex gap="sm" align="center">
                    <Image
                        src="/gaming.webp"
                        width={30}
                        height={30}
                        alt="7tv emote"
                    />
                    <Title order={4}>Заказанные игры</Title>
                </Flex>
            </NavigationPaper>
            <NavigationPaper href="/movies">
                <Flex gap="sm" align="center">
                    <Image
                        src="/moviE.webp"
                        width={30}
                        height={30}
                        alt="7tv emote"
                    />
                    <Title order={4}>Заказанные фильмы</Title>
                </Flex>
            </NavigationPaper>
        </Stack>
    );
};

export default IndexPage;
