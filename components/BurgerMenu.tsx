"use client";

import { Burger } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const BurgerMenu = () => {
    const searchParams = useSearchParams();

    const pathname = usePathname();

    const router = useRouter();

    const createQueryString = useCallback(
        (name: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === null) params.delete(name);
            else params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const onBurgerClick = () => {
        if (searchParams.get("menu") === null) {
            router.push(pathname + "?" + createQueryString("menu", "true"));
        } else {
            router.push(pathname + "?" + createQueryString("menu", null));
        }
    };

    return (
        <Burger
            opened={searchParams.has("menu")}
            onClick={onBurgerClick}
            aria-label="Toggle navigation"
        />
    );
};

export default BurgerMenu;
