import React from "react"
import ReactDOM from "react-dom"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./index.css"
import reportWebVitals from "./reportWebVitals"
import theme from "./styles/theme"
import BasePage from "./pages/BasePage"
import AboutUs from "./pages/AboutUs"
import NotFound from "./pages/NotFound"
import Overview from "./pages/Overview"

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BasePage />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="*" element={<NotFound />} />
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
