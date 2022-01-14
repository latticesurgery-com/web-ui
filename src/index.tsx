import React from "react"
import ReactDOM from "react-dom"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./index.css"
import BasePage from "./pages/BasePage"
import reportWebVitals from "./reportWebVitals"
import About from "./pages/About"
import theme from "./styles/theme"

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BasePage />} />
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
