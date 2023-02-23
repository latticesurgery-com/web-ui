import React from "react"
import { Container } from "@chakra-ui/react"
import Navbar from "components/UI/Navbar"

const Base = (props: React.PropsWithChildren<Record<never, never>>) => {
    return (
        <Container maxW="container.xl">
            <Navbar />
            {props.children}
        </Container>
    )
}

export default Base
