import Animation from "../base/animation";
import DataBus from "../databus";

const ENEMY_IMG_SRC = '@CDNPATH/enemy.png'
const ENEMY_WIDTH = 60
const ENEMY_HEIGHT = 60



const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus();
const screenWidth = databus.innerWidth
const screenHeight = databus.innerHeight

function rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
    constructor() {
        super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT);
        this.initExplosionAnimation();
    }

    init(speed) {
        this.x = rnd(0, screenWidth - ENEMY_WIDTH);
        this.y = -this.height;
        this[__.speed] = speed;
        this.visible = true;
    }

    // 预定义爆炸的帧动画
    initExplosionAnimation() {
        let frames = [];
        const EXPLO_IMG_PREFIX = '@CDNPATH/explosion';
        const EXPLO_FRAME_COUNT = 19;
        for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
            frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png');
        }
        this.initFrames(frames);
    }

    update() {
        this.y += this[__.speed];
        if (this.y > screenHeight + this.height) {
            databus.removeEnemy(this);
        }
    }
}