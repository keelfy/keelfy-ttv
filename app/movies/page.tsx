import MovieList from "@/components/movie/MovieList";
import { Title } from "@mantine/core";

const MoviesPage = async () => {
    return (
        <>
            <Title order={1}>Фильмы</Title>
            <MovieList py="md" />
        </>
    );
};

export default MoviesPage;
