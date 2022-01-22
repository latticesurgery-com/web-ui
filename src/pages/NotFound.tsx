import { Box, Heading, Text, Button, Link } from "@chakra-ui/react"
import { Link as Routerlink } from "react-router-dom"

const NotFound = (): JSX.Element => {
    return (
        <>
            <Box textAlign={"center"} mt={"20vh"}>
                <Heading as="h1" size="2xl" mb={4} textAlign={"center"}>
                    Page Not Found
                </Heading>
                <Text mb={6} mx={"auto"} maxW={"xl"} textAlign={"center"}>
                    The page you are looking for does not exist.
                </Text>
                <Button colorScheme={"orange"}>
                    <Link
                        as={Routerlink}
                        to="/"
                        _hover={{ textDecoration: "none", color: "inherit" }}
                    >
                        Go to Home
                    </Link>
                </Button>
            </Box>
        </>
    )
}

export default NotFound
