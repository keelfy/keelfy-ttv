import { Movie } from "@/model/supabase.model";
import { BoxProps, Text } from "@mantine/core";

type Props = BoxProps & {
    movie: Movie;
    participant?: boolean;
};

const getStatusColor = (status?: string | null, participant?: boolean) => {
    switch (status) {
        case "watched":
            return "green";
        case "skipped":
            return "red";
        default:
            return participant ? null : "gray";
    }
};

const MovieTitle = ({ movie, participant, ...props }: Props) => {
    return (
        <Text
            size="lg"
            fw={700}
            {...(getStatusColor(movie?.status, participant) !== null
                ? { c: getStatusColor(movie?.status, participant)! }
                : {})}
            truncate="start"
            {...props}
        >
            {movie?.name}
            {movie.release_year && (
                <Text size="sm" span visibleFrom="xs">
                    &nbsp;({movie.release_year})
                </Text>
            )}
        </Text>
    );
};

export default MovieTitle;
