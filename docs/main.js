import { mazeEngine } from "./src/mazeEngine.js";

let maze = null


function createMaze() {

    let canvas = document.getElementById("mazeCanvas")
    let rows = parseInt(document.getElementById("rowsInput").value)
    let cols = parseInt(document.getElementById("colsInput").value)
    let size = parseInt(document.getElementById("sizeInput").value)

    //clear old canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)

    //create new maze engine
    maze = new mazeEngine(canvas, rows , cols , size , "#444")
}

//event handling
document.getElementById("generateBtn").addEventListener("click", createMaze);

createMaze()
