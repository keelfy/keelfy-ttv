"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import classes from "./MenuLink.module.css";

type Props = LinkProps & {
    children: React.ReactNode;
    href: string;
};

const MenuLink = ({ children, ...props }: Props) => {
    const pathname = usePathname();

    return (
        <Link
            className={classes.link}
            data-active={pathname.startsWith(props.href)}
            {...props}
        >
            {children}
        </Link>
    );
};

export default MenuLink;
