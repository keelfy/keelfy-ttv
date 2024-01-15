import { BoxProps, Flex, Text } from "@mantine/core";

type Props = BoxProps & {
    orderCount: number;
};

const MovieOrderCountBox = ({ orderCount, ...props }: Props) => {
    return (
        <Flex w={25} {...props}>
            <Text
                fw={500}
                style={(theme) => ({
                    border: "1px solid gray",
                    borderRadius: theme.radius.sm,
                    textAlign: "center",
                })}
                w="100%"
            >
                {orderCount}
            </Text>
        </Flex>
    );
};

export default MovieOrderCountBox;
