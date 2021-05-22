import SimplexNoise from 'simplex-noise';
import { Path, Point } from 'paper';

export default class Wave {
    constructor() {
        this.vars();
        this.drawShape();
    }

    vars() {
        this.windowWidth = document.body.clientWidth;
        this.windowHeight = document.body.clientHeight;
        this.nbPoint = 300;
        this.path = new Path();
        this.simplex = new SimplexNoise();
    }

    drawShape() {
        for(let i = -10; i <= this.nbPoint + 10; i++) {
            this.path.add(new Point((this.windowWidth / this.nbPoint) * i , this.windowHeight / 2));
        }

        this.path.add(new Point(this.windowWidth , this.windowHeight));
        this.path.add(new Point(0 , this.windowHeight));
        this.path.closed = true;
        this.path.smooth();
        this.finalPath = this.path.clone();

        this.finalPath.fillColor = {
            gradient: {
                stops: ['#0b42bb', '#90b2ff']
            },
            origin: [0, this.windowHeight],
            destination: [0, this.windowHeight / 2]
        };
    }

    randomWave(event) {
        this.finalPath.segments.forEach((segment, index) => {
            if (index <= this.nbPoint + 20) {
                segment.point.x = this.path.segments[index].point.x + (this.simplex.noise3D(index / 3, 0, event.count * 0.003));
                segment.point.y = this.path.segments[index].point.y + (this.simplex.noise3D(index / this.nbPoint, event.count * 0.003, 0)) * 30;
            }
        });
    }
}
