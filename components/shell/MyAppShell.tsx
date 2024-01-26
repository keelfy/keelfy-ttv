"use client";

import { AppShell, AppShellProps } from "@mantine/core";
import { useSearchParams } from "next/navigation";

type Props = AppShellProps & {
    children: React.ReactNode;
};

const MyAppShell = ({ children, ...props }: Props) => {
    const searchParams = useSearchParams();

    const hidden = !searchParams.has("menu");

    return (
        <AppShell
            navbar={{
                width: hidden ? 0 : 300,
                breakpoint: "xs",
                collapsed: { mobile: hidden },
            }}
            {...props}
        >
            {children}
        </AppShell>
    );
};

export default MyAppShell;
