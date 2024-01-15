"use client";

import { ActionIcon, BoxProps, Flex, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { BiCollapseVertical, BiExpandVertical } from "react-icons/bi";
import MovieOrderCountBox from "./MovieOrderCountBox";
import MovieTitle from "./MovieTitle";

type Props = BoxProps & {
    movie: Movie;
    orderCount?: number;
    children: ReactNode;
};

const ShowMovieOrderButton = ({ movie, children, orderCount = 0 }: Props) => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
            <Flex gap="lg" justify="space-between" align="center">
                <Flex gap="md" align="center">
                    <ActionIcon
                        variant="subtle"
                        onClick={toggle}
                        disabled={orderCount === 0}
                    >
                        {opened ? <BiCollapseVertical /> : <BiExpandVertical />}
                    </ActionIcon>
                    <MovieTitle movie={movie} />
                </Flex>
                <MovieOrderCountBox orderCount={orderCount} />
            </Flex>
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

export default ShowMovieOrderButton;
