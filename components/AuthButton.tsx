"use client";

import { signInTwitch, signOut } from "@/app/actions/auth";
import { Button } from "@mantine/core";
import { useTransition } from "react";
import { FaSignOutAlt, FaTwitch } from "react-icons/fa";

type Props = {
    logged?: boolean;
};

const AuthButton = ({ logged }: Props) => {
    const [isLoading, startTransition] = useTransition();

    return (
        <Button
            onClick={() =>
                logged
                    ? startTransition(signOut)
                    : startTransition(signInTwitch)
            }
            leftSection={logged ? <FaSignOutAlt /> : <FaTwitch />}
            loading={isLoading}
        >
            {logged ? "Выйти" : "Продолжить с Twitch"}
        </Button>
    );
};

export default AuthButton;
