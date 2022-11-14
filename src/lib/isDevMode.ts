import queryString from "query-string"

const isDevMode = (): boolean => {
    return queryString.parse(window.location.search).port == "true"
}

export default isDevMode
