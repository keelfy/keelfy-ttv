import { Movie, MovieOrder } from "@/model/supabase.model";
import { Anchor, BoxProps, Divider, Flex, Stack, Text } from "@mantine/core";
import ShowMovieOrderButton from "./ShowMovieOrderButton";

type Props = BoxProps & {
    movie: Movie;
    orders: MovieOrder[];
    chance?: number;
};

const MovieItem = ({ movie, orders, chance, ...props }: Props) => {
    const MIN_ORDERS = parseInt(
        process.env.NEXT_PUBLIC_MIN_ORDERS_FOR_MOVIE ?? "2"
    );

    const participant = orders.length >= MIN_ORDERS;

    return (
        <Stack gap="sm" {...props}>
            <ShowMovieOrderButton
                movie={movie}
                orderCount={orders.length}
                chance={chance}
                participant={participant}
            >
                <Flex gap="lg" align="center">
                    <Divider orientation="vertical" ml="1rem" />
                    <Stack gap="xs">
                        {movie.url && (
                            <Anchor href={movie.url}>
                                Ссылка для просмотра
                            </Anchor>
                        )}
                        {movie.release_year && (
                            <Flex gap="xs" hiddenFrom="xs">
                                <Text c="dimmed">Год выхода:</Text>
                                <Text>{movie.release_year}</Text>
                            </Flex>
                        )}
                        {movie.status === "next" && (
                            <Text fw={700}>Выпал в рулетке</Text>
                        )}
                        <Flex gap="xs">
                            <Text c="dimmed">
                                Заказчик{orders.length > 1 ? "и" : ""}:
                            </Text>
                            <Stack gap={0}>
                                {orders.length === 0 && (
                                    <Text>Неизвестный</Text>
                                )}
                                {orders.map((order, i, arr) => (
                                    <Text key={order.id}>
                                        {order.orderer_username}
                                        <Text span c="dimmed" size="sm">
                                            &nbsp; (
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString()}
                                            )
                                        </Text>
                                    </Text>
                                ))}
                            </Stack>
                        </Flex>
                        {movie.status === "watched" && movie.watched_at && (
                            <Flex gap="xs">
                                <Text c="dimmed">Просмотрено:</Text>
                                <Text>
                                    {new Date(
                                        movie.watched_at
                                    ).toLocaleDateString()}
                                </Text>
                            </Flex>
                        )}
                        {movie.status === "unwatched" && (
                            <Flex gap="xs">
                                <Text c="dimmed">Участвует в рулетке?</Text>
                                <Text>{participant ? "Да" : "Нет"}</Text>
                            </Flex>
                        )}
                        <Flex gap="xs">
                            <Text c="dimmed">Добавлено:</Text>
                            <Text>
                                {new Date(
                                    movie.created_at
                                ).toLocaleDateString()}
                            </Text>
                        </Flex>
                    </Stack>
                </Flex>
            </ShowMovieOrderButton>
        </Stack>
    );
};

export default MovieItem;
