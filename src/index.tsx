import React from "react"
import ReactDOM from "react-dom"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import reportWebVitals from "./reportWebVitals"
import theme from "./styles/theme"
import Base from "./pages/Base"

const Home = React.lazy(() => import("./pages/Home"))
const CompilerPage = React.lazy(() => import("./pages/Compiler"))
const AboutUs = React.lazy(() => import("./pages/AboutUs"))
const Overview = React.lazy(() => import("./pages/Overview"))
const NotFound = React.lazy(() => import("./pages/NotFound"))

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Base>
                                <Home />
                            </Base>
                        }
                    />
                    <Route
                        path="/online-compiler"
                        element={
                            <Base>
                                <CompilerPage />
                            </Base>
                        }
                    />
                    <Route
                        path="/overview"
                        element={
                            <Base>
                                <Overview />
                            </Base>
                        }
                    />
                    <Route
                        path="/about-us"
                        element={
                            <Base>
                                <AboutUs />
                            </Base>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Base>
                                <NotFound />
                            </Base>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
