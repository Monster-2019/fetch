import { paramsStringify, configMerge } from '../utils/index'
import { HAS_BODY_METHODS, NO_BODY_METHODS } from '../config'
import InterceptorChain from './interceptor'

class MonsterFetch {
    #controller = new AbortController()
    interceptors = {
        request: new InterceptorChain(),
        response: new InterceptorChain()
    }
    constructor(config) {
        this.defaultConfig = config
    }

    async request() {
        // 使用arguments实现重载
        const argu = Array.prototype.slice.apply(arguments)
        let url, body, options
        if (argu.length === 1 && typeof argu[0] === 'object') {
            [url, body = {}, options = {}] = argu[0]
        } else {
            [url, body = {}, options = {}] = argu
        }
        let chain = [this.#sendRequest.bind(this), undefined]

        chain.unshift(...this.interceptors.request.handles.map(interceptor => [interceptor.resolve, interceptor.reject]).flat())

        chain.push(...this.interceptors.response.handles.map(interceptor => [interceptor.resolve, interceptor.reject]).flat())

        let promise = Promise.resolve({ url, body, options })
        while (chain.length > 0) {
            promise = promise.then(chain.shift(), chain.shift())
        }
        return promise
    }

    async cancel() {
        this.#controller.abort()
    }

    async #sendRequest({ url, body, options }) {
        let requestUrl = (url.includes('http') ? '' : this.defaultConfig.baseUrl) + url
        let config = configMerge(this.defaultConfig, options)
        const { method = 'get' } = config

        if (NO_BODY_METHODS.includes(method.toLocaleLowerCase())) {
            if (JSON.stringify(body) !== '{}') {
                requestUrl += (url.indexOf('?') > -1 ? '&' : '?') + paramsStringify(body)
            }
        }
        if (HAS_BODY_METHODS.includes(method.toLocaleLowerCase())) {
            config.body = JSON.stringify(body)
        }
        const timer = setTimeout(() => {
            this.#controller.abort()
        }, this.defaultConfig.timeout)
        return await fetch(requestUrl, {
            ...config,
            method: method.toLocaleUpperCase(),
            signal: this.#controller.signal
        }).finally(_ => {
            clearTimeout(timer)
        })
    }
}

[...NO_BODY_METHODS, ...HAS_BODY_METHODS].forEach(function (method) {
    MonsterFetch.prototype[method] = async function (url, body = {}, options = {}) {
        const requestConfig = configMerge(this.defaultConfig, options)
        return await this.request(url, body, {
            ...requestConfig,
            method
        })
    }
})

export default MonsterFetch