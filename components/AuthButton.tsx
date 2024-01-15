import { createClient } from "@/utils/supabase/server";
import { Button } from "@mantine/core";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await supabase.auth.signOut();
        return redirect("/login");
    };

    return user ? (
        <div className="flex items-center gap-4">
            Hey, {user.email}!
            <form action={signOut}>
                <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                    Выйти
                </button>
            </form>
        </div>
    ) : (
        <Button component={Link} href="/login" variant="light">
            Войти
        </Button>
    );
}