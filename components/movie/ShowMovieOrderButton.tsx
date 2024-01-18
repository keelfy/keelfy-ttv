"use client";

import { Movie } from "@/model/supabase.model";
import { BoxProps, Button, Group, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { BiCollapseVertical, BiExpandVertical } from "react-icons/bi";
import MovieOrderCountBox from "./MovieOrderCountBox";
import MovieTitle from "./MovieTitle";

type Props = BoxProps & {
    movie: Movie;
    orderCount?: number;
    children: ReactNode;
    chance?: number;
};

const ShowMovieOrderButton = ({
    movie,
    children,
    orderCount = 0,
    chance,
}: Props) => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
            <Button
                variant="subtle"
                onClick={toggle}
                justify="space-between"
                rightSection={
                    <MovieOrderCountBox
                        orderCount={orderCount}
                        chance={
                            movie.status !== "unwatched" ? undefined : chance
                        }
                    />
                }
            >
                <Group wrap="nowrap">
                    {opened ? <BiCollapseVertical /> : <BiExpandVertical />}
                    <MovieTitle movie={movie} />
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

export default ShowMovieOrderButton;
