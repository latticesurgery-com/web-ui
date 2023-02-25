import {
    Stack,
    Heading,
    Text,
    Button,
    Link,
    Image,
    Flex,
    useColorModeValue,
} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"
import { Link as RouterLink } from "react-router-dom"

import SFULogo from "assets/backers/SFU_horizontal_logo_rgb.png"
import SFULogoReversed from "assets/backers/SFU_horizontal_reversed_colour_rgb.png"
import AaltoLogo from "assets/backers/AaltoLogo.png"
import UnitaryFundLogo from "assets/backers/UnitaryFundLogo.png"

const Home = (): JSX.Element => {
    return (
        <>
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
                    <Link
                        as={RouterLink}
                        to={"/online-compiler"}
                        _hover={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Button size={"lg"}>Try out a demo</Button>
                    </Link>
                    <Link
                        _hover={{ textDecoration: "none", color: "inherit" }}
                        href="https://github.com/latticesurgery-com/"
                        isExternal
                    >
                        <Button
                            variant={"outline"}
                            size={"lg"}
                            rightIcon={<FaGithub />}
                            borderWidth={2}
                            _hover={{ borderColor: "gray.500" }}
                        >
                            Visit us on GitHub
                        </Button>
                    </Link>
                </Flex>
            </Stack>
            <Stack my={"50px"} spacing={4} textAlign={"center"}>
                <Text fontSize={"lg"} letterSpacing={3} fontWeight={500}>
                    SUPPORTED AND BACKED BY
                </Text>
                <Flex rowGap={10} columnGap={20} wrap={"wrap"} justify={"center"} align={"center"}>
                    <Link href="https://unitary.fund/">
                        <Image src={UnitaryFundLogo} h={"50px"} />
                    </Link>
                    <Link href="https://sfu.ca/">
                        <Image src={useColorModeValue(SFULogo, SFULogoReversed)} h={"50px"} />
                    </Link>
                    <Link
                        href="https://aalto.fi/en"
                        filter={useColorModeValue("unset", "invert(100%)")}
                    >
                        <Image src={AaltoLogo} h={"50px"} />
                    </Link>
                </Flex>
            </Stack>
        </>
    )
}

export default Home
