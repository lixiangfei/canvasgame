import Player from './player/index';
import Enemy from './npc/enemy';
import BackGround from './runtime/background';

import DataBus from './databus';

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let databus = new DataBus();

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
export default class Main {
    constructor() {
        //维护当前requestAnimationFrame的id
        this.aniId = 0;
        jQuery(document).keydown((evt) => {
            var distance = 6;
            if (evt.which == KEY_LEFT) {
                distance *= -1;
                this.player.setAirPosAcrossFingerPosZ(distance);
            } else if (evt.which == KEY_RIGHT) {

                this.player.setAirPosAcrossFingerPosZ(distance);
            }
        });
        this.restart();
    }

    restart() {
        databus.reset();
        this.bg = new BackGround(ctx);
        this.player = new Player();
        this.bindLoop = this.loop.bind(this);
        this.hasEventBind = false;
        window.cancelAnimationFrame(this.aniId);
        this.aniId = window.requestAnimationFrame(this.bindLoop);

    }
    enemyGenerate() {
        if (databus.frame % 30 === 0) {
            let enemy = databus.pool.getItemByClass('enemy', Enemy)
            enemy.init(6)
            databus.enemys.push(enemy)
        }
    }

    // 全局碰撞检测
    collisionDetection() {
        let that = this
        databus.bullets.forEach((bullet) => {
            for (let i = 0, il = databus.enemys.length; i < il; i++) {
                let enemy = databus.enemys[i]
                if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
                    enemy.playAnimation()
                    bullet.visible = false
                    break
                }
            }
        })

        for (let i = 0, il = databus.enemys.length; i < il; i++) {
            let enemy = databus.enemys[i]
            if (this.player.isCollideWith(enemy)) {
                databus.gameOver = true
                break
            }
        }
    }

    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bg.render(ctx)
        databus.bullets
            .concat(databus.enemys)
            .forEach((item) => {
                item.drawToCanvas(ctx)
            })

        this.player.drawToCanvas(ctx)

        databus.animations.forEach((ani) => {
            if (ani.isPlaying) {
                ani.aniRender(ctx)
            }
        })
    }

    update() {
        this.bg.update()

        databus.bullets
            .concat(databus.enemys)
            .forEach((item) => {
                item.update()
            })
        this.enemyGenerate();

        this.collisionDetection()
        if (databus.frame % 20 === 0) {
            this.player.shoot()
        }
    }

    loop() {
        databus.frame++;
        this.update();
        this.render();
        this.aniId = this.aniId = window.requestAnimationFrame(
            this.bindLoop
        )
    }
}