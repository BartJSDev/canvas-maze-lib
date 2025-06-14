export class Node {

    constructor(row, col, size , wallcolor) {

        this.row = row
        this.col = col
        this.size = size
        this.wallcolor = wallcolor
        this.isWall = false
        this.scale = 0
        this.open = false
        this.visited = false
    }

    update() {

        let speed = .05

        if (this.isWall && this.scale < 1 && !this.open) {

            this.scale += speed
            if (this.scale > 1) this.scale = 1
        }

        if (this.isWall && this.scale > 0 && this.open) {

            this.scale -= speed
            if (this.scale <= 0) {
                
                this.scale = 0
                this.isWall = false
            }
        }
    }

    draw(ctx) {

        let x = this.col * this.size
        let y = this.row * this.size

        ctx.beginPath()
        ctx.strokeStyle = "#666"
        ctx.rect(x, y, this.size, this.size)
        ctx.stroke()
        ctx.closePath()

        if (this.isWall) {

            let s = this.size * this.scale 
            let offset = (this.size - s) / 2

            ctx.beginPath()
            ctx.fillStyle = this.wallcolor
            ctx.rect(x + offset, y + offset, s,s)
            ctx.fill()
            ctx.closePath()

        }

    }
}