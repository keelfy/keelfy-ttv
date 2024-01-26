import { GAME_STATUSES, Game } from "@/model/supabase.model";
import { BoxProps, Text, Title } from "@mantine/core";

type Props = BoxProps & {
    game: Game;
};

const getStatusColor = (status: string | null) =>
    GAME_STATUSES.find((s) => s.name === status)?.color ?? null;

const getStatusText = (status: string | null) =>
    GAME_STATUSES.find((s) => s.name === status)?.translation ?? status;

const GameTitle = ({ game, ...props }: Props) => {
    return (
        <Title
            order={4}
            {...(getStatusColor(game.status) !== null
                ? { c: getStatusColor(game.status)! }
                : {})}
            {...props}
        >
            <Text span>{game?.name}</Text>
            <Text span size="sm" tt="uppercase" c="dimmed" visibleFrom="xs">
                &nbsp;&mdash;&nbsp;{getStatusText(game.status)}
            </Text>
        </Title>
    );
};

export default GameTitle;
