import { Game, GameOrder } from "@/model/supabase.model";
import { BoxProps, Divider, Flex, Stack, Text } from "@mantine/core";
import GameOrderButton from "./GameOrderButton";

type Props = BoxProps & {
    game: Game;
    orders: GameOrder[];
};

const GameItem = ({ game, orders, ...props }: Props) => {
    return (
        <Stack gap="sm" {...props}>
            <GameOrderButton game={game}>
                <Flex gap="lg" align="center">
                    <Divider orientation="vertical" ml={13} />
                    <Stack gap="xs">
                        {orders.length === 0 && <Text>Неизвестный</Text>}
                        {orders.map((order) => (
                            <Text key={order.id}>{order.orderer_username}</Text>
                        ))}
                    </Stack>
                </Flex>
            </GameOrderButton>
        </Stack>
    );
};

export default GameItem;
