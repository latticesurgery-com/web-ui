import { LinkBox, LinkOverlay, Box, Text, Heading, useColorModeValue } from "@chakra-ui/react"

interface ArticleProps {
    date: Date
    title: string
    href: string
    children?: JSX.Element | JSX.Element[]
}

const Article = ({ date, title, href, children }: ArticleProps) => {
    return (
        <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
            <Box as="time" dateTime={date.toISOString()}>
                <Text fontSize="sm" color="gray.500">
                    {date.toLocaleDateString("default", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                    })}
                </Text>
            </Box>
            <Heading size="md" my={2} fontWeight={600}>
                <LinkOverlay
                    href={href}
                    isExternal
                    _hover={{ color: useColorModeValue("blue.600", "blue.200") }}
                >
                    {title}
                </LinkOverlay>
            </Heading>
            {children}
        </LinkBox>
    )
}

export default Article
