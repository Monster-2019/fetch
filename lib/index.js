import MonsterFetch from './core/fetch'
import { DEFAULT_CONFIG, VERSION } from "./config"
import { configMerge, extend } from './utils/index'


const createInstance = (defaultConfig) => {
    const context = new MonsterFetch(defaultConfig)
    const instance = MonsterFetch.prototype.request.bind(context)

    extend(instance, MonsterFetch.prototype, context)
    extend(instance, context)

    // class 方法不可遍历  手动绑定
    instance['cancel'] = MonsterFetch.prototype.cancel.bind(context)
    instance['pool'] = MonsterFetch.prototype.pool.bind(context)

    instance.create = (config) => {
        return createInstance(configMerge(defaultConfig, config))
    }

    return instance
}

let monsterFetch = createInstance(DEFAULT_CONFIG)

monsterFetch.MonsterFetch = MonsterFetch
monsterFetch.VERSION = VERSION
monsterFetch.all = function all(promises) {
    return Promise.all(promises);
}

export default monsterFetch