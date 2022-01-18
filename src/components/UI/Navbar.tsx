import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    useColorMode,
    useDisclosure,
    useColorModeValue,
    Stack,
    LinkProps as ChakraLinkProps,
} from "@chakra-ui/react"
import { Link as RouterLink, LinkProps as RouterLinkProps, useLocation } from "react-router-dom"
import { IoMdMenu, IoIosClose, IoMdSunny, IoMdMoon } from "react-icons/io"

import logo from "../../assets/logo.svg"
import logoDark from "../../assets/logo-dark.svg"

interface LinkItem {
    readonly name: string
    readonly href: string
}

const Links: Array<LinkItem> = [
    { name: "Home", href: "/" },
    { name: "Online Compiler", href: "/online-compiler" },
    { name: "Overview", href: "/overview" },
    { name: "Docs", href: "https://lattice-surgery-compiler.readthedocs.io/en/latest/" },
    { name: "GitHub", href: "https://github.com/latticesurgery-com/" },
    { name: "About Us", href: "/about-us" },
]

interface NavLinkProps {
    name: string
    href: string
    isActive: boolean
}

const NavLink = ({ name, href, isActive }: NavLinkProps) => {
    const isExternal =
        typeof href === "string" && (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0)

    let LinkProps: RouterLinkProps | ChakraLinkProps = {}

    if (isExternal) {
        LinkProps = { href: href, isExternal }
    } else {
        LinkProps = {
            fontWeight: isActive ? 600 : "normal",
            as: RouterLink,
            to: href,
        }
    }
    return (
        <Link
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
                textDecoration: "none",
                color: "unset",
                bg: useColorModeValue("gray.100", "gray.700"),
            }}
            {...LinkProps}
        >
            {name}
        </Link>
    )
}

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    const location = useLocation()

    return (
        <>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"} gap={1}>
                <IconButton
                    size={"md"}
                    icon={isOpen ? <IoIosClose /> : <IoMdMenu />}
                    aria-label={"Open Menu"}
                    display={{ md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                    p={"auto"}
                />
                <HStack spacing={8} alignItems={"center"}>
                    <Box as={RouterLink} to={"/"}>
                        <img src={useColorModeValue(logo, logoDark)} alt={"logo"} />
                    </Box>
                    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                        {Links.map((link) => (
                            <NavLink
                                key={link.name}
                                isActive={location.pathname === link.href}
                                name={link.name}
                                href={link.href}
                            />
                        ))}
                    </HStack>
                </HStack>
                <IconButton
                    onClick={toggleColorMode}
                    size={"md"}
                    icon={colorMode === "light" ? <IoMdMoon /> : <IoMdSunny />}
                    aria-label={"Toggle Color Mode"}
                />
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                    <Stack as={"nav"} spacing={4}>
                        {Links.map((link) => (
                            <NavLink
                                key={link.name}
                                isActive={location.pathname === link.href}
                                name={link.name}
                                href={link.href}
                            />
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </>
    )
}

export default Navbar
