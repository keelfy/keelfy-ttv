"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const fetchRequestedMovies = async (searchReq?: string) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    if (!searchReq || searchReq.length === 0) {
        return await supabase
            .from("movies")
            .select("*")
            .order("status", { ascending: false });
    } else {
        return await supabase
            .from("movies")
            .select("*")
            .textSearch("name", `'${searchReq}'`)
            .order("status", { ascending: false });
    }
};

export const fetchMoviesOrderers = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    return await supabase.from("movie_orders").select("*");
};
