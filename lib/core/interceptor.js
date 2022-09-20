class InterceptorChain {
    constructor() {
        this.handles = []
    }

    use(resolve, reject) {
        this.handles.push({
            resolve,
            reject
        })
        return this.handles.length - 1
    }

    clear() {
        this.handles = []
    }
}

export default InterceptorChain