const DEFAULT_HEADERS = {
    "Content-Type": "application/json"
}

const DEFAULT_CONFIG = {
    baseUrl: "",
    method: "GET",
    mode: "cors",
    timeout: 10000
}

const NO_BODY_METHODS = ['get', 'delete']
const HAS_BODY_METHODS = ['post', 'put', 'patch']

const VERSION = '0.0.1'

export {
    DEFAULT_CONFIG,
    DEFAULT_HEADERS,
    NO_BODY_METHODS,
    HAS_BODY_METHODS,
    VERSION
}