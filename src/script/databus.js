import Pool from './base/pool';

let instance;

/**全局状态管理器 */
export default class DataBus {
    constructor() {
        if (instance) return instance;
        instance = this;

        this.pool = new Pool();
        this.reset();
        this.innerWidth = 500;
        this.innerHeight = 750;
    }

    reset() {
        this.frame = 0;
        this.score = 0;
        this.bullets = [];
        this.enemys = [];
        this.animations = [];
        this.gameOver = false;
    }

    /**
     * 回收敌人，进入对象池
     * 此后不进入帧循环
     */
    removeEnemy(enemy) {
        let temp = this.enemys.shift();

        temp.visible = false;

        this.pool.recover('enemy', enemy);
    }

    removeBullets(bullet) {
        let temp = this.bullets.shift();
        temp.visible = false;
        this.pool.recover('bullet', bullet);
    }
}