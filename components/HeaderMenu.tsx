"use client";

import { Group } from "@mantine/core";
import Link from "next/link";
import classes from "./HeaderMenu.module.css";

const HeaderMenu = () => {
    return (
        <Group gap="sm">
            <Link href="/games" className={classes.link}>
                Игры
            </Link>
            <Link href="/movies" className={classes.link}>
                Фильмы
            </Link>
        </Group>
    );
};

export default HeaderMenu;
