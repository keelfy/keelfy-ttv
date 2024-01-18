"use client";

import {
    ActionIcon,
    Group,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import cx from "clsx";
import { FaMoon, FaSun } from "react-icons/fa";
import classes from "./ThemeButton.module.css";

const ThemeButton = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    return (
        <Group justify="center">
            <ActionIcon
                onClick={() =>
                    setColorScheme(
                        computedColorScheme === "light" ? "dark" : "light"
                    )
                }
                variant="subtle"
                size="lg"
                aria-label="Toggle color scheme"
            >
                <FaSun className={cx(classes.icon, classes.light)} />
                <FaMoon className={cx(classes.icon, classes.dark)} />
            </ActionIcon>
        </Group>
    );
};

export default ThemeButton;
