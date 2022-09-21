import { HAS_BODY_METHODS, NO_BODY_METHODS } from '../config'

const paramsStringify = (params = {}) => {
    return Object.keys(params).map(key => {
        return `${key}=${encodeURI(params[key])}`
    }).join('&')
}

const mergeObject = (cf1, cf2) => {
    return Object.assign({}, cf1, cf2)
}

const configMerge = (defaultConfig, config) => {
    let configMerge = mergeObject(defaultConfig, config)

    let headers = { ...defaultConfig.headers || {} }
    Object.keys(configMerge.headers || {}).forEach(key => {
        headers[key] = configMerge.headers[key]
    })
    configMerge.headers = headers
    return configMerge
}

const extend = (target, origin, context) => {
    for (let key of Object.keys(origin)) {
        if (origin.hasOwnProperty(key)) {
            if (typeof origin[key] === 'function') {
                target[key] = origin[key].bind(context)
            } else {
                target[key] = origin[key]
            }
        }
    }
}

export {
    paramsStringify,
    configMerge,
    extend
}