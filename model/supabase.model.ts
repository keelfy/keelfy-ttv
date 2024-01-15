type Movie = {
    id: number;
    created_at: string;
    name: string | null;
    release_year?: number | null;
    url?: string | null;
    status?: MovieStatus | null;
};

type MovieStatus = "watched" | "unwatched" | "skipped";

type MovieOrder = {
    id: number;
    created_at: string;
    orderer_username: string;
    film_id: number;
};
