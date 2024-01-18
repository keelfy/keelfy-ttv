"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return revalidatePath("/");
};

export const signInTwitch = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        error,
        data: { url },
    } = await supabase.auth.signInWithOAuth({
        provider: "twitch",
    });

    if (error || !url) {
        return redirect("/?message=Could not authenticate user");
    }

    return redirect(url);
};
