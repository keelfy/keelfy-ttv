import AuthenticationForm from "@/components/auth/AuthenticationForm";
import { Center } from "@mantine/core";

type Props = {
    searchParams: { message: string };
};

const LoginPage = async ({ searchParams }: Props) => {
    return (
        <Center>
            <AuthenticationForm w={450} searchParams={searchParams} />
        </Center>
    );
};

export default LoginPage;
