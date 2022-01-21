import { Container } from "@chakra-ui/react"
import Navbar from "../components/UI/Navbar"

interface MyProps {}

const Base = (props: React.PropsWithChildren<MyProps>) => {
    return (
        <Container maxW="container.xl">
            <Navbar />
            {/* Page Component Goes Here: */}
            {props.children}
            {/* Footer Will Go Here */}
        </Container>
    )
}

export default Base
