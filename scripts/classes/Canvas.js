import Delaunator from './Delaunator.js';
import CustomAnimation from './CustomAnimation.js';
import { rand } from '../utils.js';
import CONSTS from '../consts.js';

export default class Canvas {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.triangles = [];
        this.color = '';

        this.animation = new CustomAnimation(this.canvas);

        this.recreate();

        window.addEventListener('slideChanging', this.#onBackgroundChanging.bind(this));
        window.addEventListener('slideChanged', this.#onBackgroundChanged.bind(this));
        window.addEventListener('resize', this.redraw.bind(this));
    }

    recreate() {
        this.color = rand(50, 330);
        this.redraw();
    }

    redraw() {
        this.#scale();
        this.#update();
        // for smooth display
        for (let i = 0; i < 5; i++) {
            this.#draw();
        }
    }

    #onBackgroundChanging() {
        this.animation.run(
            {
                initial: {
                    opacity: 1
                },
                becoming: {
                    opacity: 0
                }
            },
            {
                transitionTime: CONSTS.TRANSITION_TIME / 2,
                fill: 'forwards'
            },
            this.recreate.bind(this)
        );
    }

    #onBackgroundChanged() {
        this.animation.run(
            {
                initial: {
                    opacity: 0
                },
                becoming: {
                    opacity: 1
                }
            }, {
                transitionTime: CONSTS.TRANSITION_TIME / 2,
                fill: 'forwards'
            }
        );
    }

    #scale() {
        const rect = document.body.getBoundingClientRect();
        this.canvas.width = rect.width * 0.75;
        this.canvas.height = rect.height * 0.75;
    }

    #draw() {
        function drawTriangle(triangle, light, color) {
            this.ctx.fillStyle = `hsl(${color}, 100%, ${30 - light * 75}%)`;
            // this.ctx.strokeStyle = '#FF0000';
            this.ctx.beginPath();
            this.ctx.moveTo(triangle[0][0], triangle[0][1]);
            this.ctx.lineTo(triangle[1][0], triangle[1][1]);
            this.ctx.lineTo(triangle[2][0], triangle[2][1]);
            this.ctx.fill();
            // this.ctx.stroke();
            this.ctx.closePath();
        }

        this.triangles.forEach(
            (triangle, i) => drawTriangle.call(this, triangle, i / this.triangles.length, this.color)
        );
    }

    #update(cols = 10, rows = 10, dps = 40) {
        function getDots(dps) { // dots per square
            const columnWidth = this.canvas.width / cols;
            const columnHeight = this.canvas.height / rows;
            const dots = [];
            for (let i = 0; i < rows; i++) {
                const line = [];
                for (let j = 0; j < cols; j++) {
                    for (let k = 0; k < dps; k++) {
                        line.push([
                            rand(i * columnWidth, (i + 1) * columnWidth),
                            rand(j * columnHeight, (j + 1) * columnHeight)
                        ]);
                    }
                }
                dots.push(line);
            }
            return dots;
        }

        function getTriangles(dots) {
            const converted = [];
            dots.forEach(column => converted.push(...column));
            const delaunay = Delaunator.from(converted).triangles;
            const triangles = [];
            for (let i = 0; i < delaunay.length; i += 3) {
                triangles.push([
                    converted[delaunay[i]],
                    converted[delaunay[i + 1]],
                    converted[delaunay[i + 2]]
                ]);
            }
            return triangles;
        }

        if (cols <= 0 || rows <= 0 || dps <= 0) return;

        const dots = getDots.call(this, dps);
        this.triangles = getTriangles(dots);
    }
}