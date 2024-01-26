import { Paper, PaperProps } from "@mantine/core";
import Link from "next/link";
import classes from "./NavigationPaper.module.css";

type Props = PaperProps & {
    children: React.ReactNode;
    href: string;
};

const NavigationPaper = ({ children, href, ...props }: Props) => {
    return (
        <Paper
            shadow="sm"
            withBorder
            p="md"
            component={Link}
            href={href}
            className={classes.paper}
            {...props}
        >
            {children}
        </Paper>
    );
};

export default NavigationPaper;
