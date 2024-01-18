import { BoxProps, Flex, Text } from "@mantine/core";

type Props = BoxProps & {
    orderCount: number;
    chance?: number;
};

const MovieOrderCountBox = ({ orderCount, chance, ...props }: Props) => {
    return (
        <Flex w={90} gap="xs" align="center" justify="center" {...props}>
            <Text fw={700}>{orderCount}</Text>
            <Text fw={500}>
                ({chance ? Math.round(chance * 100) : <>&mdash;</>}%)
            </Text>
        </Flex>
    );
};

export default MovieOrderCountBox;
