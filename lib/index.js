import MFetch from './core/fetch'
import { DEFAULT_CONFIG, VERSION } from "./config"
import { configMerge, extend } from './utils/index'


const createInstance = (defaultConfig) => {
    const context = new MFetch(defaultConfig)
    const instance = MFetch.prototype.request.bind(context)

    extend(instance, MFetch.prototype, context)
    extend(instance, context)

    // class 方法不可遍历  手动绑定
    instance['cancel'] = MFetch.prototype.cancel.bind(context)

    instance.create = (config) => {
        return createInstance(configMerge(defaultConfig, config))
    }
    
    return instance
}

let mfetch = createInstance(DEFAULT_CONFIG)

mfetch.MFetch = MFetch
mfetch.VERSION = VERSION
mfetch.all = function all(promises) {
    return Promise.all(promises);
}

export default mfetch