import { Container, Stack, Heading, Text, Button, Link, Image, Flex } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"

import Navbar from "../components/UI/Navbar"

const Home = (): JSX.Element => {
    return (
        <Container maxW="container.xl">
            <Navbar />
            <Stack
                textAlign={"center"}
                align={"center"}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
            >
                <Heading as={"h1"} fontSize={{ base: "4xl", md: "6xl" }} lineHeight={"110%"}>
                    Lattice Surgery{" "}
                    <Text as={"span"} color={"#0bb8e0"}>
                        Compiler
                    </Text>
                </Heading>
                <Text maxW={"2xl"} fontSize={"xl"}>
                    Lattice Surgery Compiler (LSC) is an open-source quantum computing project that
                    aims to build a compiler to translate logical circuits to lattice surgery
                    operations on a surface code lattice.
                </Text>
                <Flex gap={6} direction={"row"} wrap={"wrap"} justify={"center"}>
                    <Button size={"lg"}>Test out the visualizer</Button>
                    <Button
                        variant={"outline"}
                        size={"lg"}
                        as={Link}
                        href="https://github.com/latticesurgery-com/"
                        isExternal
                        _hover={{ textDecoration: "none", color: "inherit" }}
                        rightIcon={<FaGithub />}
                    >
                        Visit us on GitHub
                    </Button>
                </Flex>
            </Stack>
            <Stack my={"50px"} spacing={4} textAlign={"center"}>
                <Text fontSize={"lg"} letterSpacing={3} fontWeight={500}>
                    SUPPORTED AND BACKED BY
                </Text>
                <Stack spacing={10} direction={"row"} justify={"center"}>
                    <Link href="http://unitary.fund/">
                        <Image src="https://unitary.fund/logos/logov3.svg" h={"50px"} />
                    </Link>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Home
