import { Stack, Heading, Text, Button, Link, Image, Flex } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"
import { Link as RouterLink } from "react-router-dom"
import SFULogo from "../assets/SFU_horizontal_logo_rgb.png"
import AaltoLogo from "../assets/AaltoLogo.png"
import Base from "./Base"
import Compiler from "../components/sections/Compiler"
import { useState } from "react"
import { AppState } from "../appState"

const Home = (): JSX.Element => {
    const [appState, setAppState] = useState(new AppState())
    return (
        <Base>
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
                    <Button size={"lg"}>
                        <Link
                            as={RouterLink}
                            to={"/online-compiler"}
                            _hover={{ textDecoration: "none", color: "inherit" }}
                        >
                            Try out the compiler
                        </Link>
                    </Button>
                    <Button
                        variant={"outline"}
                        size={"lg"}
                        rightIcon={<FaGithub />}
                        borderWidth={2}
                        _hover={{ borderColor: "gray.500" }}
                    >
                        <Link
                            _hover={{ textDecoration: "none", color: "inherit" }}
                            isExternal
                            href="https://github.com/latticesurgery-com/"
                        >
                            Visit us on GitHub
                        </Link>
                    </Button>
                </Flex>
            </Stack>
            <Compiler />
            <Stack my={"50px"} spacing={4} textAlign={"center"}>
                <Text fontSize={"lg"} letterSpacing={3} fontWeight={500}>
                    SUPPORTED AND BACKED BY
                </Text>
                <Flex gap={10} wrap={"wrap"} justify={"center"} align={"center"}>
                    <Link href="http://unitary.fund/">
                        <Image src="https://unitary.fund/logos/logov3.svg" h={"50px"} />
                    </Link>
                    <Link href="http://sfu.ca/">
                        <Image src={SFULogo} h={"50px"} />
                    </Link>
                    <Link href="http://aalto.fi/en">
                        <Image src={AaltoLogo} h={"50px"} />
                    </Link>
                </Flex>
            </Stack>
        </Base>
    )
}

export default Home
