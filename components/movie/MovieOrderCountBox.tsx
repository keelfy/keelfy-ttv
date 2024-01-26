import { BoxProps, Flex, Text } from "@mantine/core";

type Props = BoxProps & {
    orderCount: number;
    chance?: number;
};

const MovieOrderCountBox = ({ orderCount, chance, ...props }: Props) => {
    return (
        <Flex w={90} gap="xs" align="center" justify="flex-start" {...props}>
            <Text fw={700} c="yellow">
                {orderCount}
            </Text>
            <Text>{chance ? (chance * 100).toFixed(1) : <>&mdash;</>}%</Text>
        </Flex>
    );
};

export default MovieOrderCountBox;
