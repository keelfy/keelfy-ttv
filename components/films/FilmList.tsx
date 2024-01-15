import { createClient } from "@/utils/supabase/server";
import { BoxProps, Stack } from "@mantine/core";
import { cookies } from "next/headers";
import FilmListItem from "./FilmListItem";

const FilmList = async (props: BoxProps) => {
    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data: movies } = await supabase.from("films").select("*");

    const films: Movie[] = [
        { id: 1, created_at: "2024-01-15 11:59:46.208265+00", name: "Шрек 2" },
        {
            id: 3,
            created_at: "2024-01-15 12:00:31.654812+00",
            name: "Голый пистолет",
        },
        {
            id: 4,
            created_at: "2024-01-15 12:00:41.25347+00",
            name: "Лего Ниндзяго",
        },
        {
            id: 6,
            created_at: "2024-01-15 12:02:29.941212+00",
            name: "Джунгли",
            release_year: 2017,
        },
        {
            id: 7,
            created_at: "2024-01-15 12:07:01.018285+00",
            name: "Берсерк. Золотой век: Фильм I. Бехерит Властителя",
            status: "skipped",
        },
        {
            id: 8,
            created_at: "2024-01-15 12:07:34.569279+00",
            name: "FNAF",
            status: "skipped",
        },
        {
            id: 9,
            created_at: "2024-01-15 12:07:46.944532+00",
            name: "Американский психопат",
        },
        {
            id: 10,
            created_at: "2024-01-15 12:08:12.769257+00",
            name: "Мальчик и птица",
        },
        {
            id: 11,
            created_at: "2024-01-15 12:08:12.769257+00",
            name: "Иллюзия побега",
        },
        {
            id: 12,
            created_at: "2024-01-15 12:08:12.769257+00",
            name: "Живая сталь",
            release_year: 2011,
            status: "watched",
        },
    ];

    const orders: MovieOrder[] = [
        {
            id: 1,
            created_at: "2024-01-15 12:08:12.769257+00",
            orderer_username: "mntfrs",
            film_id: 1,
        },
        {
            id: 2,
            created_at: "2024-01-15 12:08:12.769257+00",
            orderer_username: "shizukachee",
            film_id: 1,
        },
        {
            id: 3,
            created_at: "2024-01-15 12:08:12.769257+00",
            orderer_username: "zveern",
            film_id: 4,
        },
        {
            id: 4,
            created_at: "2024-01-15 12:08:12.769257+00",
            orderer_username: "schizukachee",
            film_id: 11,
        },
        {
            id: 5,
            created_at: "2024-01-15 12:08:12.769257+00",
            orderer_username: "mntfrs",
            film_id: 12,
        },
    ];

    return (
        <Stack gap="md" {...props}>
            {films?.map((film) => (
                <FilmListItem
                    key={film.id}
                    movie={film}
                    orders={orders.filter((order) => order.film_id === film.id)}
                />
            ))}
        </Stack>
    );
};

export default FilmList;
