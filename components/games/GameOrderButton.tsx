"use client";

import { Game } from "@/model/supabase.model";
import { BoxProps, Button, Group, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { BiCollapseVertical, BiExpandVertical } from "react-icons/bi";
import GameTitle from "./GameTitle";

type Props = BoxProps & {
    game: Game;
    children: ReactNode;
};

const GameOrderButton = ({ game, children }: Props) => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
            <Button variant="subtle" onClick={toggle} justify="space-between">
                <Group wrap="nowrap">
                    {opened ? <BiCollapseVertical /> : <BiExpandVertical />}
                    <GameTitle game={game} />
                </Group>
            </Button>
            <Transition
                mounted={opened}
                transition="scale-y"
                duration={100}
                timingFunction="ease"
            >
                {(styles) => <div style={styles}>{children}</div>}
            </Transition>
        </>
    );
};

export default GameOrderButton;
