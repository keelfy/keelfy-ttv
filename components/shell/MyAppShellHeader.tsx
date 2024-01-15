'use client';

import { AppShell, AppShellHeaderProps } from "@mantine/core";
import { ReactNode } from "react";

type Props = AppShellHeaderProps & {
    children: ReactNode;
};

const MyAppShellHeader = ({ children, ...props }: Props) => (
    <AppShell.Header {...props}>{children}</AppShell.Header>
);

export default MyAppShellHeader;
