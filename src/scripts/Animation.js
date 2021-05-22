import * as paper from 'paper';
import Sun from './Sun';
import Wave from './Wave';

export default class Animation {
    constructor() {
        this.initEls();
        this.initCanvas();
    }

    initEls() {
        this.canvas = document.getElementById('myCanvas');

        if(this.canvas) {
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight;

            paper.setup(this.canvas);
        }
    }

    initCanvas() {
        const sun = new Sun();
        const wave = new Wave();

        paper.view.onFrame = (event) => {
            sun.randomRay(event);
            wave.randomWave(event);
        };
    }
}
