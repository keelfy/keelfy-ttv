"use client";

import { fetchGames, fetchGamesOrderers } from "@/app/actions/games";
import { GAME_STATUSES, Game, GameOrder } from "@/model/supabase.model";
import {
    ActionIcon,
    BoxProps,
    Flex,
    Input,
    Loader,
    Menu,
    Stack,
    Tooltip,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState, useTransition } from "react";
import { MdCheck, MdFilterAlt, MdSearch } from "react-icons/md";
import GameItem from "./GameItem";

const GameList = (props: BoxProps) => {
    const [filteredStatuses, setFilteredStatuses] = useState<string[]>([]);

    const [searchReq, setSearchReq] = useState("");

    const [debouncedSearch] = useDebouncedValue(searchReq, 200);

    const [isGamesLoading, updateGames] = useTransition();

    const [isOrdersLoading, updateOrders] = useTransition();

    const [orders, setOrders] = useState<GameOrder[]>([]);

    const [games, setGames] = useState<Game[]>([]);

    const getMovieItem = (game: Game) => (
        <GameItem
            key={game.id}
            game={game}
            orders={orders?.filter((order) => order.game === game.id) ?? []}
        />
    );

    const onFilterStatus = (status: string) => {
        if (filteredStatuses.find((x) => x === status)) {
            setFilteredStatuses(filteredStatuses.filter((x) => x !== status));
        } else {
            setFilteredStatuses([...filteredStatuses, status]);
        }
    };

    useEffect(() => {
        updateOrders(async () => {
            fetchGamesOrderers().then((res) =>
                res.data !== null ? setOrders(res.data) : null
            );
        });
    }, []);

    useEffect(() => {
        const statuses =
            filteredStatuses.length > 0
                ? filteredStatuses
                : GAME_STATUSES.map((x) => x.name);

        updateGames(async () => {
            fetchGames(debouncedSearch, statuses).then((res) =>
                res.data !== null ? setGames(res.data) : null
            );
        });
    }, [debouncedSearch, filteredStatuses]);

    return (
        <Stack gap="md" {...props}>
            <Flex align="center" gap="md">
                <Input
                    leftSection={
                        isGamesLoading || isOrdersLoading ? (
                            <Loader size="xs" />
                        ) : (
                            <MdSearch />
                        )
                    }
                    style={{ flexGrow: 1 }}
                    placeholder="Введите название..."
                    value={searchReq}
                    onChange={(e) => setSearchReq(e.currentTarget.value)}
                />
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Tooltip label="Фильтрация">
                            <ActionIcon size="lg">
                                <MdFilterAlt />
                            </ActionIcon>
                        </Tooltip>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Статус</Menu.Label>
                        {GAME_STATUSES.map((status) => (
                            <Menu.Item
                                key={status.name}
                                c={status.color}
                                onClick={() => onFilterStatus(status.name)}
                                rightSection={
                                    filteredStatuses.find(
                                        (x) => x === status.name
                                    ) ? (
                                        <MdCheck />
                                    ) : null
                                }
                            >
                                {status.translation}
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
            </Flex>
            {games.map(getMovieItem)}
        </Stack>
    );
};

export default GameList;
