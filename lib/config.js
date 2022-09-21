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
    NO_BODY_METHODS,
    HAS_BODY_METHODS,
    VERSION
}