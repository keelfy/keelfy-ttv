'use client';

import {
    AppShell,
    AppShellMainProps
} from "@mantine/core";
import { ReactNode } from "react";

type Props = AppShellMainProps & {
    children: ReactNode;
};

const MyAppShellMain = ({ children, ...props }: Props) => (
    <AppShell.Main {...props}>{children}</AppShell.Main>
);

export default MyAppShellMain;
