import Sprite from "../base/sprite";

import DataBus from '../databus';

let databus = new DataBus();
const screenWidth = databus.innerWidth;
const screenHeight = databus.innerHeight;

const BG_IMG_SRC = '@CDNPATH/bg.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 512

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
    constructor(ctx) {
        super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT);
        this.render(ctx);
        this.top = 0;
    }

    update() {
        this.top += 2;
        if (this.top >= screenHeight) {
            this.top = 0;
        }
    }

    /**
     * 背景图重绘函数
     * 绘制两张图片，两张图片大小和屏幕一致
     * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
     * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
     */
    render(ctx) {
        //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        //img 【sx开始剪裁的x坐标位置】 【sy开始剪裁的y坐标位置】 【swidth被剪裁图像的宽度】【sheight被剪裁图像的高度】
        //【x在画布上放置图像的x坐标位置】【y在画布上放置图像的y坐标位置】【width要使用图像的宽度】【height要使用的图像的高度】
        ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
            0, -screenHeight + this.top,
            screenWidth,
            screenHeight
        )

        ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
            0,
            this.top,
            screenWidth,
            screenHeight
        );
    }
}