'use client';

import {
    AppShell,
    AppShellFooterProps
} from "@mantine/core";
import { ReactNode } from "react";

type Props = AppShellFooterProps & {
    children: ReactNode;
};

const MyAppShellFooter = ({ children, ...props }: Props) => (
    <AppShell.Footer {...props}>{children}</AppShell.Footer>
);

export default MyAppShellFooter;
