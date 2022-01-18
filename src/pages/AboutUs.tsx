import { Avatar, Flex, Box, Heading, Text, Icon, Link, Container } from "@chakra-ui/react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import Navbar from "../components/UI/Navbar"

const AboutUs = (): JSX.Element => {
    return (
        <Container maxW="container.xl">
            <Navbar />
            <Heading as="h1" size="2xl" my={4} textAlign={"center"}>
                Our Team
            </Heading>
            <Text mb={4} mx={"auto"} maxW={"xl"} textAlign={"center"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi
                vel consectetur interdum, nisl nunc egestas nisi, sed malesuada nisl nunc euismod
                nisi vel consectetur interdum. Pellentesque euismod, nisi vel consectetur interdum,
                nisl nunc egestas nisi, sed malesuada nisl nunc euismod nisi vel consectetur
            </Text>
            <Flex gap={10} justifyContent={"center"} py={6} flexWrap={"wrap"}>
                <Box
                    maxW={"320px"}
                    w={"full"}
                    boxShadow={"2xl"}
                    rounded={"md"}
                    p={"6"}
                    textAlign={"center"}
                >
                    <Avatar src="https://avatars.githubusercontent.com/u/46719079" mb={4} />
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                        Alex Nguyen
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} mb={4}>
                        alexnguyenn
                    </Text>
                    <Text mb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                        euismod, nisi vel consectetur interdum, nisl
                    </Text>
                    <Flex flexWrap={"wrap"} gap={3} justifyContent={"center"}>
                        <Link href={"https://github.com/alexnguyenn"}>
                            <Icon as={FaGithub} w={6} h={6} opacity={"75%"} />
                        </Link>
                        <Link href={"https://www.linkedin.com/in/alex-nguyen-906320163/"}>
                            <Icon as={FaLinkedin} w={7} h={7} opacity={"75%"} />
                        </Link>
                    </Flex>
                </Box>
                <Box
                    maxW={"320px"}
                    w={"full"}
                    boxShadow={"2xl"}
                    rounded={"md"}
                    p={"6"}
                    textAlign={"center"}
                >
                    <Avatar src="https://avatars.githubusercontent.com/u/36427091" mb={4} />
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                        George Watkins
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} mb={4}>
                        gwwatkin
                    </Text>
                    <Text mb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                        euismod, nisi vel consectetur interdum, nisl
                    </Text>
                    <Flex flexWrap={"wrap"} gap={3} justifyContent={"center"}>
                        <Link href={"https://github.com/gwwatkin"}>
                            <Icon as={FaGithub} w={6} h={6} opacity={"75%"} />
                        </Link>
                        <Link href={"https://www.linkedin.com/in/gwwatkins/"}>
                            <Icon as={FaLinkedin} w={7} h={7} opacity={"75%"} />
                        </Link>
                    </Flex>
                </Box>
                <Box
                    maxW={"320px"}
                    w={"full"}
                    boxShadow={"2xl"}
                    rounded={"md"}
                    p={"6"}
                    textAlign={"center"}
                >
                    <Avatar src="https://avatars.githubusercontent.com/u/47836064" mb={4} />
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                        Keelan Watkins
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} mb={4}>
                        Keelando
                    </Text>
                    <Text mb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                        euismod, nisi vel consectetur interdum, nisl
                    </Text>
                    <Flex flexWrap={"wrap"} gap={3} justifyContent={"center"}>
                        <Link href={"https://github.com/Keelando"}>
                            <Icon as={FaGithub} w={6} h={6} opacity={"75%"} />
                        </Link>
                        <Link href={"https://www.linkedin.com/in/keelanwatkins87/"}>
                            <Icon as={FaLinkedin} w={7} h={7} opacity={"75%"} />
                        </Link>
                    </Flex>
                </Box>
                <Box
                    maxW={"320px"}
                    w={"full"}
                    boxShadow={"2xl"}
                    rounded={"md"}
                    p={"6"}
                    textAlign={"center"}
                >
                    <Avatar src="https://avatars.githubusercontent.com/u/27089492" mb={4} />
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                        Varun Seshadri
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} mb={4}>
                        isolatedinformation
                    </Text>
                    <Text mb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                        euismod, nisi vel consectetur interdum, nisl
                    </Text>
                    <Flex flexWrap={"wrap"} gap={3} justifyContent={"center"}>
                        <Link href={"https://github.com/isolatedinformation"}>
                            <Icon as={FaGithub} w={6} h={6} opacity={"75%"} />
                        </Link>
                        <Link href={"https://www.linkedin.com/in/isolatedinformation/"}>
                            <Icon as={FaLinkedin} w={7} h={7} opacity={"75%"} />
                        </Link>
                    </Flex>
                </Box>
            </Flex>
        </Container>
    )
}

export default AboutUs