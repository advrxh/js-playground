// app js

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// ctx.fillStyle = "red"
// ctx.fillRect(10, 10, 100, 100)
// ctx.fillStyle = "blue"
// ctx.fillRect(120, 10, 100, 100)

// ctx.lineWidth = 5
// ctx.strokeStyle = "green"
// ctx.strokeRect(240, 10, 100, 100)

// ctx.font = "40px poppins"
// ctx.lineWidth = 2
// ctx.strokeStyle = "orange"
// ctx.fillStyle = "orange"

// ctx.fillText("Orange", 10, 150)
// ctx.strokeText("Orange", 170, 150)

// ctx.lineWidth = 1
// ctx.beginPath()
// ctx.moveTo(10, 20)
// ctx.lineTo(100, 20)
// ctx.lineTo(55, 100)
// ctx.closePath()
// ctx.fill()

// ctx.beginPath()
// ctx.moveTo(100, 100)
// ctx.lineTo(190, 100)
// ctx.lineTo(190 - 45, 20)
// ctx.lineTo(100, 100)
// ctx.fillStyle = "red"
// ctx.closePath()
// ctx.fill()

// ctx.beginPath()
// ctx.rect(220, 20, 150, 80)
// ctx.fillStyle = "green"
// ctx.fill()
// ctx.closePath()

// ctx.strokeStyle = "red"
// ctx.fillStyle = "red"
// ctx.lineWidth = 5

// const centerX = canvas.width / 2
// const centerY = canvas.height / 2

// ctx.beginPath()

// ctx.arc(centerX, centerY, centerX - 20, 0, Math.PI * 2)

// ctx.moveTo((centerX / 3) * 1.9, (centerY / 3) * 1.6)

// ctx.arc((centerX / 3) * 1.6, (centerY / 3) * 1.6, 30, 0, Math.PI * 2)

// ctx.moveTo((centerX / 3) * 4.3, (centerY / 3) * 1.6)

// ctx.arc((centerX / 3) * 4, (centerY / 3) * 1.6, 30, 0, Math.PI * 2)

// ctx.moveTo(centerX + (centerX - 100), centerY)

// ctx.arc(centerX, centerY, centerX - 100, 0, Math.PI, false)

// ctx.strokeStyle = "black"

// ctx.moveTo(10, 10)
// ctx.quadraticCurveTo()

// ctx.stroke()

// Animation 1

// const circle = {
//     x: canvas.width - canvas.width + 20,
//     y: canvas.height - canvas.height + 20,
//     size: 10,
//     dx: 1,
//     dy: 6,
// }

// const drawCircle = () => {
//     ctx.beginPath()
//     ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
//     ctx.fillStyle = "green"
//     ctx.fill()
// }

// const update = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     drawCircle()

//     // change position

//     circle.x += circle.dx
//     circle.y += circle.dy

//     if (circle.x + circle.size > canvas.width || circle.x < 0) {
//         circle.dx *= -1
//     }
//     if (circle.y + circle.size > canvas.height || circle.y < 0) {
//         circle.dy *= -1
//     }

//     requestAnimationFrame(update)
// }

// update()

const duck = document.getElementById("source")

const player = {
    w: 70,
    h: 70,
    x: 10,
    y: 10,
    speed: 5,
    dx: 0,
    dy: 0,
}

// duck methods

const drawPlayer = () => {
    ctx.drawImage(duck, player.x, player.y, player.w, player.h)
}

const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const moveDuck = () => {
    player.x += player.dx
    player.y += player.dy

    detect()
}

const detect = () => {
    if (player.x < 0) {
        player.x = 0
    }

    // Right Wall
    if (player.x + player.w > canvas.width) {
        player.x = canvas.width - player.w
    }

    // Top wall
    if (player.y < 0) {
        player.y = 0
    }

    // Bottom Wall
    if (player.y + player.h > canvas.height) {
        player.y = canvas.height - player.h
    }
}

const move = (dir) => {
    if (dir === 1) {
        player.y = player.speed
    } else if (dir === 2) {
        player.y = -player.speed
    } else if (dir === 3) {
        player.x = player.speed
    } else if (dir === 4) {
        player.x = -player.speed
    }
}

const render = () => {
    clear()

    drawPlayer()

    moveDuck()

    requestAnimationFrame(render)
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "Up") {
        move(1) // 1 = up
    } else if (e.key === "ArrowDown" || e.key === "Down") {
        move(2) // 2 = down
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
        move(3) // 3 = left
    } else if (e.key === "ArrowRight" || e.key === "Right") {
        move(4) // 4= right
    }
})

document.addEventListener("keyup", (e) => {
    if (
        e.key === "ArrowUp" ||
        e.key === "Up" ||
        e.key === "ArrowDown" ||
        e.key === "Down" ||
        e.key === "ArrowLeft" ||
        e.key === "Left" ||
        e.key === "ArrowRight" ||
        e.key === "Right"
    ) {
        player.dx = 0
        player.dy = 0
    }
})
render()