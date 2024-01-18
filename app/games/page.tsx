import GameList from "@/components/games/GameList";
import { Title } from "@mantine/core";

const GamesPage = async () => {
    return (
        <>
            <Title order={1}>Игры</Title>
            <GameList py="md" />
        </>
    );
};

export default GamesPage;
