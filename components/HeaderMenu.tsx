"use client";

import { Group } from "@mantine/core";
import classes from "./HeaderMenu.module.css";

const HeaderMenu = () => {
    return (
        <Group gap="sm">
            <a
                href={"/games"}
                className={classes.link}
                onClick={(event) => event.preventDefault()}
            >
                Игры
            </a>
            <a
                href={"/movies"}
                className={classes.link}
                onClick={(event) => event.preventDefault()}
            >
                Фильмы
            </a>
        </Group>
    );
};

export default HeaderMenu;
