import { GAME_STATUSES, Game, GameOrder } from "@/model/supabase.model";
import { Anchor, BoxProps, Divider, Flex, Stack, Text } from "@mantine/core";
import GameOrderButton from "./GameOrderButton";

type Props = BoxProps & {
    game: Game;
    orders: GameOrder[];
};

const getMotivationTranslation = (motivation: string | null) => {
    switch (motivation) {
        case "ordered":
            return "Заказано";
        case "desired":
            return "По желанию";
        default:
            return motivation;
    }
};

const GameItem = ({ game, orders, ...props }: Props) => {
    return (
        <Stack gap="sm" {...props}>
            <GameOrderButton game={game}>
                <Flex gap="lg" align="center">
                    <Divider orientation="vertical" ml="1rem" />
                    <Stack gap="xs">
                        {game.url && (
                            <Anchor href={game.url}>Ссылка на игру</Anchor>
                        )}
                        <Flex gap="xs" hiddenFrom="xs">
                            <Text c="dimmed">Статус:</Text>
                            <Text
                                c={
                                    GAME_STATUSES.find(
                                        (s) => s.name === game.status
                                    )?.color ?? undefined
                                }
                            >
                                {GAME_STATUSES.find(
                                    (s) => s.name === game.status
                                )?.translation ?? game.status}
                            </Text>
                        </Flex>
                        <Flex gap="xs">
                            <Text c="dimmed">Мотивация:</Text>
                            <Text>
                                {getMotivationTranslation(game.motivation)}
                            </Text>
                        </Flex>
                        {game.motivation === "ordered" && (
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
                        )}
                        <Flex gap="xs">
                            <Text c="dimmed">Добавлено:</Text>
                            <Text>
                                {new Date(game.created_at).toLocaleDateString()}
                            </Text>
                        </Flex>
                    </Stack>
                </Flex>
            </GameOrderButton>
        </Stack>
    );
};

export default GameItem;
