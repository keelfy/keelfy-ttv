import { MantineColor, StyleProp } from "@mantine/core";

export type Movie = {
    id: number;
    created_at: string;
    watched_at: string | null;
    name: string | null;
    release_year: number | null;
    url: string | null;
    status: string | null;
};

export type MovieStatus = "watched" | "unwatched" | "skipped";

export type MovieOrder = {
    id: number;
    created_at: string;
    orderer_username: string | null;
    movie: number;
};

export type Game = {
    id: number;
    created_at: string;
    name: string | null;
    status: string | null;
    url: string | null;
    motivation: string | null;
};

export type GameStatus =
    | "abandoned"
    | "completed"
    | "playing"
    | "planned"
    | "skipped"
    | "on_hold"
    | "played";

export type GameMotivation = "ordered" | "desired";

export type GameOrder = {
    id: number;
    created_at: string;
    orderer_username: string | null;
    game: number;
};

export type GameStatusInfo = {
    name: string;
    translation: string;
    color: StyleProp<MantineColor>;
};

export const GAME_STATUSES: GameStatusInfo[] = [
    {
        name: "abandoned",
        translation: "Заброшено",
        color: "red",
    },
    {
        name: "completed",
        translation: "Пройдено",
        color: "green",
    },
    {
        name: "playing",
        translation: "В процессе",
        color: "blue",
    },
    {
        name: "planned",
        translation: "Запланировано",
        color: "violet",
    },
    {
        name: "skipped",
        translation: "Пропущено",
        color: "grey",
    },
    {
        name: "on_hold",
        translation: "Отложено",
        color: "orange",
    },
    {
        name: "played",
        translation: "Сыграно",
        color: "cyan",
    },
];
