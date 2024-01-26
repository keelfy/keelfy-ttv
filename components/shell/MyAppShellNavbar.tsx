"use client";

import { AppShell, AppShellNavbarProps } from "@mantine/core";
import { ReactNode } from "react";

type Props = AppShellNavbarProps & {
    children: ReactNode;
};

const MyAppShellNavbar = ({ children, ...props }: Props) => (
    <AppShell.Navbar {...props}>{children}</AppShell.Navbar>
);

export default MyAppShellNavbar;
