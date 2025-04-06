document.addEventListener('DOMContentLoaded', function() {
    const score = document.getElementById("score")
    const life = document.getElementById("life")
    const game = document.getElementById("game")
    const result = document.getElementById("result")
    const a = document.getElementById("a")
    const b = document.getElementById("b")
    const c = document.getElementById("c")

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
    console.log()
});