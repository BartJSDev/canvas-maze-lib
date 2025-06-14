import { Node } from './node.js';

export class mazeEngine {

    constructor(canvas, rows, cols, size , wallcolor) {

        if (rows % 2 === 0 || cols % 2 === 0) {

            throw new Error("cols and rows must be odd numbers")
        }

        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.rows = rows
        this.cols = cols
        this.size = size
        this.wallcolor = wallcolor
        this.grid = []
        this.stack = []

        let ratio = window.devicePixelRatio || 1;

        this.canvas.width = this.cols * this.size * ratio;
        this.canvas.height = this.rows * this.size * ratio;

        this.canvas.style.width = `${this.cols * this.size}px`;
        this.canvas.style.height = `${this.rows * this.size}px`;

        this.ctx.scale(ratio, ratio);

        this.initGrid()

        this.currentcell = this.pickRandomCell()

        this.startAnimationLoop()

        this.generateMaze()
    }

    initGrid() {

        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = []
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = new Node(i, j, this.size , this.wallcolor)
            }
        }
    }

    drawGrid() {

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].draw(this.ctx)
                this.grid[i][j].update()
            }
        }
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawGrid()
    }

    startAnimationLoop() {

        const loop = () => {
            this.draw();
            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    //maze generator functions
    getVal(row, col) {

        if (this.grid[row] === undefined) return false
        if (this.grid[row][col] === undefined) return false
        return this.grid[row][col]
    }

    pickRandomCell() {

        let row, col

        do {

            row = Math.floor(Math.random() * this.rows)
            col = Math.floor(Math.random() * this.cols)

        } while (row % 2 === 0 || col % 2 === 0)

        return this.grid[row][col]

    }

    createWalls(row, col) {

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i !== 0 || j !== 0) {
                    if (this.getVal(row + i, col + j) && !this.getVal(row + i, col + j).open) {
                        this.getVal(row + i, col + j).isWall = true
                    }
                }
            }
        }

    }

    createOpening(cellA, cellB) {

        //right
        if (cellB.col === cellA.col + 2) {

            this.getVal(cellA.row, cellA.col + 1).open = true
        }

        //left
        if (cellB.col === cellA.col - 2) {

            this.getVal(cellA.row, cellA.col - 1).open = true
        }

        //top
        if (cellB.row === cellA.row - 2) {

            this.getVal(cellA.row - 1, cellA.col).open = true
        }

        //bottom
        if (cellB.row === cellA.row + 2) {

            this.getVal(cellA.row + 1, cellA.col).open = true
        }

    }

    getUnvisitedNeighbors(row, col) {

        let neighbors = [

            [-2, 0],
            [0, -2],
            [0, 2],
            [2, 0]
        ]

        let cells = []

        for (let i = 0; i < neighbors.length; i++) {

            let r = row + neighbors[i][0]
            let c = col + neighbors[i][1]

            if (this.getVal(r, c) && !this.getVal(r, c).visited) {

                cells.push(this.getVal(r, c))
            }
        }


        return cells[Math.floor(Math.random() * cells.length)]
    }

    generateMaze() {

        const step = () => {

            let nextcell = this.getUnvisitedNeighbors(this.currentcell.row, this.currentcell.col)

            if (nextcell) {

                this.stack.push(nextcell)
                this.createOpening(this.currentcell, nextcell)
                this.createWalls(this.currentcell.row, this.currentcell.col)
                this.createWalls(nextcell.row, nextcell.col)
                nextcell.visited = true
                this.currentcell = nextcell

            }else{

                if(this.stack.length > 0){

                    this.currentcell = this.stack.pop()

                }else{

                    console.log("maze generation complete")
                    return
                }
            }

            setTimeout(step, 10)

        }

        setTimeout(step, 10)

    }
}
