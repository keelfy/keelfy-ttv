"use client";

import { Flex, Group, Text } from "@mantine/core";
import MenuLink from "./MenuLink";
import Image from "next/image";

const HeaderMenu = () => {
    return (
        <Group gap="sm">
            <MenuLink href="/games">
                <Flex gap="xs" align="center">
                    <Image
                        src="/gaming.webp"
                        width={16}
                        height={16}
                        alt="7tv Emote gaming"
                    />
                    Игры
                </Flex>
            </MenuLink>
            <MenuLink href="/movies">
                <Flex gap="xs" align="center">
                    <Image
                        src="/moviE.webp"
                        width={16}
                        height={16}
                        alt="7tv Emote moviE"
                    />
                    Фильмы
                </Flex>
            </MenuLink>
        </Group>
    );
};

export default HeaderMenu;
