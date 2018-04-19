const __ = {
    poolDic: Symbol('poolDic')
}

/**对象池 */
export default class Pool {
    constructor() {
        this[__.poolDic] = {};
    }

    /**根据对象标识符，获取对应的对象池 */
    getPoolBySign(name) {
        return this[__.poolDic][name] || (this[__.poolDic][name] = []);
    }

    getItemByClass(name, className) {
        let pool = this.getPoolBySign(name);
        let result = (pool.length ? pool.shift() : new className());
        return result;
    }

    /**
     * 将对象回收到对象池
     * 方便后续继续使用
     */
    recover(name, instance) {
        this.getPoolBySign(name).push(instance);
    }
}