import { Container } from "@chakra-ui/react"
import Navbar from "../components/UI/Navbar"

// tslint:disable-next-line:no-empty-interface
interface MyProps {}

const Base = (component: React.PropsWithChildren<MyProps>) => {
    return (
        <Container maxW="container.xl">
            <Navbar />
            {/* Page Component Goes Here: */}
            {component.children}
            {/* Footer Will Go Here */}
        </Container>
    )
}

export default Base
