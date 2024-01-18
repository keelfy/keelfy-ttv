import { createClient } from "@/utils/supabase/server";
import {
    Button,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { FaTwitch } from "react-icons/fa";

type Props = PaperProps & {
    searchParams?: {
        message: string;
    };
};

const AuthenticationForm = async ({ searchParams, ...props }: Props) => {
    const signInTwitch = async (formData: FormData) => {
        "use server";

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "twitch",
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/");
    };

    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/");
    };

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect(
            "/login?message=Check email to continue sign in process"
        );
    };

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500} style={{ textAlign: "center" }}>
                Добро пожаловать!
            </Text>

            <Group grow mb="md" mt="md">
                <Button
                    leftSection={<FaTwitch />}
                    variant="default"
                    radius="xl"
                    formAction={signInTwitch}
                >
                    Twitch
                </Button>
            </Group>

            <Divider
                label="Или с помощью email"
                labelPosition="center"
                my="lg"
            />

            <form action={signIn}>
                <Stack>
                    <TextInput
                        required
                        label="Email"
                        placeholder="Ваш email"
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Пароль"
                        placeholder="Ваш пароль"
                        radius="md"
                    />
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Button formAction={signUp} radius="xl">
                        Создать аккаунт
                    </Button>
                    <Button formAction={signIn} radius="xl">
                        Войти
                    </Button>
                </Group>
            </form>
            {searchParams?.message && (
                <Text style={{ textAlign: "center" }} c="red" mt="lg">
                    {searchParams.message}
                </Text>
            )}
        </Paper>
    );
};

export default AuthenticationForm;
