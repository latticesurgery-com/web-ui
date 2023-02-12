import React from "react"
import { createRoot } from "react-dom/client"

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

const container = document.getElementById("root") as Element
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <BrowserRouter>
                <Base>
                    <React.Suspense fallback={<></>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/online-compiler" element={<CompilerPage />} />
                            <Route path="/overview" element={<Overview />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </React.Suspense>
                </Base>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
