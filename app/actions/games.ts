"use server";

import { GAME_STATUSES } from "@/model/supabase.model";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const fetchGames = async (
    searchReq?: string,
    statuses: string[] = GAME_STATUSES.map((status) => status.name)
) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const requested = supabase.from("games").select("*").in("status", statuses);

    if (!searchReq || searchReq.length === 0) {
        return await requested.order("status", { ascending: false });
    } else {
        return await requested
            .textSearch("name", `'${searchReq}'`)
            .order("status", { ascending: false });
    }
};

export const fetchGamesOrderers = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    return await supabase.from("game_orders").select("*");
};
