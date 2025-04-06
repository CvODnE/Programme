document.addEventListener('DOMContentLoaded', function() {
    const score = document.getElementById("score")
    const life = document.getElementById("life")
    const ques = document.getElementById("ques")
    const game = document.getElementById("game")
    const result = document.getElementById("result")
    const input = document.getElementById("input")
    const tick = document.getElementById("tick")

    let number_add = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

    let number_mul = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    let scores = 0
    score.textContent = "Score : "+scores
    let lifes = ["❤️", "❤️", "❤️", "❤️", "❤️"]
    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]

    let numa_pos1 = Math.floor(Math.random() * number_add.length)
    let numa_pos2 = Math.floor(Math.random() * number_mul.length)
    let numa1 = number_add[numa_pos1]
    let numa2 = number_add[numa_pos2]
    let numm_pos1 = Math.floor(Math.random() * number_mul.length)
    let numm_pos2 = Math.floor(Math.random() * number_mul.length)
    let numm1 = number_mul[numm_pos1]
    let numm2 = number_mul[numm_pos2]
    let adds = [numa1+" + "+numa2, numa1 + numa2]
    let subs = [adds[1]+" - "+numa2, adds[1] - numa2]
    let muls = [numm1+" x "+numm2, numm1 * numm2]
    let divs = [muls[1]+" ÷ "+numm2, muls[1] / numm2]
    let calc = [adds, subs, muls, divs]
    let calc_pos = Math.floor(Math.random() * calc.length)
    let calcs = calc[calc_pos]
    let answer = calcs[1]
    ques.textContent += "What is "+calcs[0]+" ?"
    input.value = answer
    let bool = true

    tick.addEventListener(("click"), function() {
        if(bool) {
            if(parseInt(input.value) !== parseInt(answer)) {
                game.textContent = "Wrong!"
                game.style.cssText = "color: red;"
                result.textContent = "Correct answer is "+answer+"."
                result.style.cssText = "color: cyan;"
                lifes.push(" ")
                lifes.shift()
                life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
            }else {
                game.textContent = "Correct!"
                game.style.cssText = "color: green;"
                result.textContent = ""
                scores += 1
                score.textContent = "Score : "+scores
                score.style.cssText = "animation-name: move;animation-duration: .7s;"
                if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                }
            }
            if(life.textContent !== "     ") {
                console.log(life.textContent)
                let numa_pos1 = Math.floor(Math.random() * number_add.length)
                let numa_pos2 = Math.floor(Math.random() * number_mul.length)
                let numa1 = number_add[numa_pos1]
                let numa2 = number_add[numa_pos2]
                let numm_pos1 = Math.floor(Math.random() * number_mul.length)
                let numm_pos2 = Math.floor(Math.random() * number_mul.length)
                let numm1 = number_mul[numm_pos1]
                let numm2 = number_mul[numm_pos2]
                let adds = [numa1+" + "+numa2, numa1 + numa2]
                let subs = [adds[1]+" - "+numa2, adds[1] - numa2]
                let muls = [numm1+" x "+numm2, numm1 * numm2]
                let divs = [muls[1]+" ÷ "+numm2, muls[1] / numm2]
                let calc = [adds, subs, muls, divs]
                let calc_pos = Math.floor(Math.random() * calc.length)
                let calcs = calc[calc_pos]
                answer = calcs[1]
                ques.textContent = "What is "+calcs[0]+" ?"
            }else{
                ques.textContent = "Game Over!"
                ques.style.cssText = "animation-name: mot;animation-duration: 1.5s;"
            }
        }
    })
});