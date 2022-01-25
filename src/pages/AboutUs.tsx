import { Avatar, Flex, Box, Heading, Text, Icon, Link, Button } from "@chakra-ui/react"
import { BiLinkExternal } from "react-icons/bi"
import { FaGithub, FaLinkedin } from "react-icons/fa"

import Article from "../components/UI/Article"

interface ProfileProps {
    name: string
    sub?: string
    avatarSrc: string
    description: string
    github?: string
    linkedin?: string
    children?: JSX.Element | JSX.Element[]
}

const Profile = (props: ProfileProps): JSX.Element => {
    return (
        <Box maxW="320px" w="full" boxShadow="2xl" rounded="md" p="6" textAlign="center">
            <Avatar src={props.avatarSrc} mb={4} />
            <Heading fontSize="2xl" fontFamily="body">
                {props.name}
            </Heading>
            <Text fontWeight={600} color="gray.500" mb={4}>
                {props.sub}
            </Text>
            <Text mb={4}>{props.description}</Text>
            <Flex wrap="wrap" justify="center" gap={3}>
                {props.github && (
                    <Link href={props.github} isExternal>
                        <Icon as={FaGithub} w={6} h={6} opacity="75%" />
                    </Link>
                )}
                {props.linkedin && (
                    <Link href={props.linkedin} isExternal>
                        <Icon as={FaLinkedin} w={7} h={7} opacity="75%" />
                    </Link>
                )}
            </Flex>
            {props.children}
        </Box>
    )
}

const AboutUs = (): JSX.Element => {
    return (
        <>
            <Heading as="h1" size="2xl" my={4} textAlign="center">
                Our Team
            </Heading>
            <Text mb={4} mx="auto" maxW="xl" textAlign="center">
                This project started at{" "}
                <Link href="https://www.sfu.ca/" color="teal.500" isExternal>
                    Simon Fraser University
                </Link>{" "}
                in Summer 2020, it has since then resulted in two Honours theses and became an
                international collaboration with{" "}
                <Link href="https://www.aalto.fi/en" color="teal.500" isExternal>
                    Aalto University
                </Link>{" "}
                in Finland and the{" "}
                <Link href="https://www.tum.de/en/" color="teal.500" isExternal>
                    Technical University of Munich
                </Link>{" "}
                in Germany. In Fall 2021 we were awarded a microgrant from the{" "}
                <Link href="https://unitary.fund" color="teal.500" isExternal>
                    Unitary Fund
                </Link>{" "}
                .
            </Text>
            <Flex gap={10} justifyContent="center" py={6} mb={10} flexWrap="wrap">
                <Profile
                    name="Alex Nguyen"
                    sub="alexnguyenn"
                    avatarSrc="https://avatars.githubusercontent.com/u/46719079"
                    description={
                        "Just a normal everyday Computer Science undergrad at SFU. " +
                        "Currently in a love-hate relationship with Javascript."
                    }
                    github="https://github.com/alexnguyenn"
                    linkedin="https://www.linkedin.com/in/alex-nguyen-906320163/"
                />

                <Profile
                    name="George Watkins"
                    sub="gwwatkin"
                    avatarSrc="https://avatars.githubusercontent.com/u/36427091"
                    description={
                        "Loves math, programming, endurance sports and music. Did too many internships."
                    }
                    github="https://github.com/gwwatkin"
                    linkedin="https://www.linkedin.com/in/gwwatkins/"
                />

                <Profile
                    name="Keelan Watkins"
                    sub="Keelando"
                    avatarSrc="https://avatars.githubusercontent.com/u/47836064"
                    description={
                        "Finding joy in the process of solving problems with a varied approach to " +
                        "full stack web applications. Enjoy hiking, surfing, and building a Raspberry Pi Cloud."
                    }
                    github="https://github.com/Keelando"
                    linkedin="https://www.linkedin.com/in/keelanwatkins87/"
                />

                <Profile
                    name="Varun Seshadri"
                    sub="isolatedinformation"
                    avatarSrc="https://avatars.githubusercontent.com/u/27089492"
                    description={
                        "Physicist who loves computers. Interested in all things quantum " +
                        "except Ant Man and the Wasp."
                    }
                    github="https://github.com/isolatedinformation"
                    linkedin="https://www.linkedin.com/in/isolatedinformation/"
                />
            </Flex>

            <Heading as="h2" size="xl" my={4} textAlign="center">
                Advisors
            </Heading>
            <Flex gap={10} justifyContent="center" py={6} mb={20} flexWrap="wrap">
                <Profile
                    name="Steven Pearce"
                    sub="Lecturer at Simon Fraser University"
                    avatarSrc="https://www.cs.sfu.ca/~stevenp/scan0005.jpg"
                    description={
                        "Former astrophysicist, current non-conformist. Went from tsunami waves to wave-particles."
                    }
                >
                    <Link
                        href="https://www2.cs.sfu.ca/~stevenp"
                        isExternal
                        _hover={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Button variant="outline" size="sm" rightIcon={<BiLinkExternal />}>
                            Personal page
                        </Button>
                    </Link>
                </Profile>
                <Profile
                    name="Hoi-Kwan (Kero) Lau"
                    sub="Assistant Professor at Simon Fraser University, Canada Research Chair"
                    avatarSrc="https://www.sfu.ca/content/sfu/physics/people/faculty/hoikwanl.img.1629284380.png"
                    description={
                        "I aim at solving practicality issues of quantum technology, likely to be aided by the" +
                        "freedom of Canada, friendliness of Canadians, and fragrance of Tim Hortons coffee."
                    }
                >
                    <Link
                        href="https://www.sfu.ca/physics/people/faculty/hoikwanl.html"
                        isExternal
                        _hover={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Button variant="outline" size="sm" rightIcon={<BiLinkExternal />}>
                            Personal page
                        </Button>
                    </Link>
                </Profile>
                <Profile
                    name="Alexandru Paler"
                    sub="Assistant Professor at Aalto University"
                    avatarSrc="https://acris.aalto.fi/ws/portalfiles/portal/67484151/Aalto_SCI_Paler_Alexandru_2021_photo_Aalto_University_Matti_Ahlgren_7.jpg"
                    description={
                        "Researching the design and implementation of quantum software for compiling and optimising quantum circuits."
                    }
                >
                    <Link
                        href="https://www.aalto.fi/en/people/alexandru-paler"
                        isExternal
                        _hover={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Button variant="outline" size="sm" rightIcon={<BiLinkExternal />}>
                            Personal page
                        </Button>
                    </Link>
                </Profile>
            </Flex>

            <Heading as="h2" size="xl" my={4} textAlign="center">
                Mentioned in
            </Heading>
            <Flex gap={10} justifyContent="center" py={6} mb={20} flexWrap="wrap">
                <Article
                    date={new Date(2021, 11, 17)}
                    title="QST Masters Student Receives Grant to Develop Open-Source Quantum Compiler"
                    href="https://www.mcqst.de/news-and-events/news/qst-masters-student-receives-grant-quantum-compiler.html"
                />
                <Article
                    date={new Date(2021, 11, 9)}
                    title="SFU undergrads receive quantum grant award"
                    href="https://www.sfu.ca/physics/news-events/news/2021/ugrad-computing-award.html"
                />
                <Article
                    date={new Date(2021, 11, 7)}
                    title="Two SFU Computing Science Undergraduate students receive grant award to develop a quantum compiler"
                    href="https://www.sfu.ca/computing/newsandevents/2021/two-undergraduate-students-receive-grant-award-quantum-computing.html"
                />
            </Flex>

            <Text textAlign="center" fontSize="lg" opacity="75%" mb={20}>
                Want to get in touch? Contact us at{" "}
                <Link
                    href="mailto:info@latticesurgery.com"
                    isExternal
                    _hover={{ textDecoration: "underline", color: "inherit" }}
                    fontWeight={600}
                >
                    info@latticesurgery.com
                </Link>
            </Text>
        </>
    )
}

export default AboutUs
