import { Movie, MovieOrder } from "@/model/supabase.model";
import { BoxProps, Divider, Flex, Stack, Text } from "@mantine/core";
import ShowMovieOrderButton from "./ShowMovieOrderButton";

type Props = BoxProps & {
    movie: Movie;
    orders: MovieOrder[];
    chance?: number;
};

const MovieItem = ({ movie, orders, chance, ...props }: Props) => {
    return (
        <Stack gap="sm" {...props}>
            <ShowMovieOrderButton
                movie={movie}
                orderCount={orders.length}
                chance={chance}
            >
                <Flex gap="lg" align="center">
                    <Divider orientation="vertical" ml={13} />
                    <Stack gap="xs">
                        {orders.length === 0 && <Text>Неизвестный</Text>}
                        {orders.map((order) => (
                            <Text key={order.id}>{order.orderer_username}</Text>
                        ))}
                    </Stack>
                </Flex>
            </ShowMovieOrderButton>
        </Stack>
    );
};

export default MovieItem;
