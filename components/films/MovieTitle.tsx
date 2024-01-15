import { BoxProps, Title } from "@mantine/core";

type Props = BoxProps & {
    movie: Movie;
};

const getStatusColor = (status?: MovieStatus | null) => {
    switch (status) {
        case "watched":
            return "green";
        case "skipped":
            return "red";
        default:
            return null;
    }
};

const MovieTitle = ({ movie, ...props }: Props) => {
    return (
        <Title
            order={4}
            {...(getStatusColor(movie?.status) !== null
                ? { c: getStatusColor(movie?.status)! }
                : {})}
            {...props}
        >
            {movie?.name}
        </Title>
    );
};

export default MovieTitle;
