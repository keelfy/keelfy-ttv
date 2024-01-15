import { BoxProps, Divider, Flex, Stack, Text } from "@mantine/core";
import ShowMovieOrderButton from "./ShowMovieOrderButton";

type Props = BoxProps & {
    movie: Movie;
    orders: MovieOrder[];
};

const FilmListItem = async ({ movie, orders, ...props }: Props) => {
    return (
        <Stack gap="sm" {...props}>
            <ShowMovieOrderButton movie={movie} orderCount={orders.length}>
                <Flex gap="lg" align="center">
                    <Divider orientation="vertical" ml={13} />
                    <Stack gap="xs">
                        {orders.map((order) => (
                            <Text key={order.id}>{order.orderer_username}</Text>
                        ))}
                    </Stack>
                </Flex>
            </ShowMovieOrderButton>
        </Stack>
    );
};

export default FilmListItem;
