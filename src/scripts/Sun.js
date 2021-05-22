import SimplexNoise from 'simplex-noise';
import { Path, Point } from 'paper';

export default class Sun {
    constructor() {
        this.vars();
        this.drawShape();
    }

    vars() {
        this.windowWidth = document.body.clientWidth;
        this.windowHeight = document.body.clientHeight;
        this.centerX = 0.75 * this.windowWidth;
        this.centerY = 0.15 * this.windowHeight;
        this.radius = 45;
        this.nbPoint = 160;
        this.path = new Path();
        this.simplex = new SimplexNoise();
    }

    drawShape() {
        for(let i = 0; i < 2 * Math.PI; i = i + (Math.PI * 2 / this.nbPoint)) {
            this.path.add(new Point(this.centerX + Math.cos(i) * this.radius, this.centerY + Math.sin(i) * this.radius));
        }

        this.path.fillColor = '#feff00';
        this.path.strokeColor = '#edbe39';
        this.path.closed = true;
        this.finalPath = this.path.clone();
        this.finalPath.shadowColor = '#feff00';
        this.finalPath.shadowBlur = 60;
    }

    randomRay(event) {
        this.finalPath.segments.forEach((segment, index) => {
            if (index % 8 === 0) {
                this.ratio = (this.simplex.noise3D(index / 50, event.count * 0.005, 0) + 0.5) * 15;
                if (this.ratio < 0) { this.ratio = 0; }

                segment.point.x = this.path.segments[index].point.x + Math.cos(index * (Math.PI * 2 / this.nbPoint)) * this.ratio;
                segment.point.y = this.path.segments[index].point.y + Math.sin(index * (Math.PI * 2 / this.nbPoint)) * this.ratio;
            }
        });
    }
}
