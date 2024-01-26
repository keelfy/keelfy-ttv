"use client";

import {
    fetchMoviesOrderers,
    fetchRequestedMovies,
} from "@/app/actions/movies";
import { Movie, MovieOrder } from "@/model/supabase.model";
import { BoxProps, Divider, Input, Loader, Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState, useTransition } from "react";
import { MdSearch } from "react-icons/md";
import MovieItem from "./MovieItem";

const MovieList = (props: BoxProps) => {
    const [searchReq, setSearchReq] = useState("");

    const [debouncedSearch] = useDebouncedValue(searchReq, 200);

    const [isMoviesLoading, updateMovies] = useTransition();

    const [isOrdersLoading, updateOrders] = useTransition();

    const [orders, setOrders] = useState<MovieOrder[]>([]);

    const [movies, setMovies] = useState<Movie[]>([]);

    const countOrdersOfMovieId = (movieId: number) => {
        return orders?.filter((order) => order.movie === movieId).length ?? 0;
    };

    const MIN_ORDERS = parseInt(
        process.env.NEXT_PUBLIC_MIN_ORDERS_FOR_MOVIE ?? "2"
    );

    const getChanceOfMovie = (movieId: number) => {
        const quantity = countOrdersOfMovieId(movieId);
        const ordersQuantity =
            movies
                ?.filter((movie) => movie.status === "unwatched")
                ?.map((movie) => countOrdersOfMovieId(movie.id))
                .filter((quantity) => quantity >= MIN_ORDERS)
                .reduce((a, b) => a + b, 0) ?? 0;
        return quantity / ordersQuantity;
    };

    const compareMovieChances = (a: Movie, b: Movie) => {
        return countOrdersOfMovieId(a.id) > countOrdersOfMovieId(b.id) ? -1 : 1;
    };

    const compareMovieCreationDate = (a: Movie, b: Movie) => {
        return a.created_at > b.created_at ? -1 : 1;
    };

    const getMovieItem = (movie: Movie) => (
        <MovieItem
            key={movie.id}
            movie={movie}
            orders={orders?.filter((order) => order.movie === movie.id) ?? []}
            chance={getChanceOfMovie(movie.id)}
        />
    );

    useEffect(() => {
        updateOrders(async () => {
            fetchMoviesOrderers().then((res) =>
                res.data !== null ? setOrders(res.data) : null
            );
        });
    }, []);

    useEffect(() => {
        updateMovies(async () => {
            fetchRequestedMovies(debouncedSearch).then((res) =>
                res.data !== null ? setMovies(res.data) : null
            );
        });
    }, [debouncedSearch]);

    return (
        <Stack gap="md" {...props}>
            <Input
                leftSection={
                    isMoviesLoading || isOrdersLoading ? (
                        <Loader size="xs" />
                    ) : (
                        <MdSearch />
                    )
                }
                placeholder="Введите название..."
                value={searchReq}
                onChange={(e) => setSearchReq(e.currentTarget.value)}
            />
            {movies
                ?.filter((movie) => movie.status === "next")
                .map(getMovieItem)}
            {movies
                ?.filter((movie) => movie.status === "watched")
                .map(getMovieItem)}
            {movies
                ?.filter((movie) => movie.status === "unwatched")
                .sort(compareMovieCreationDate)
                .sort(compareMovieChances)
                .map(getMovieItem)}
        </Stack>
    );
};

export default MovieList;
