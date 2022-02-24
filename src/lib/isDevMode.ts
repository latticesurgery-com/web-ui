import { useSearchParams } from "react-router-dom"

const isDevMode = (): boolean => {
    const [searchParams] = useSearchParams()

    return searchParams.get("dev") === "true"
}

export default isDevMode
