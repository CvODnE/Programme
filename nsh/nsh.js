document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('a');
    const target1 = document.getElementById('b');
    const target2 = document.getElementById('c');
    const one = document.getElementById("one")
    const two = document.getElementById("two")
    const three = document.getElementById("three")
    const scoreElement = document.getElementById('score');
    const life = document.getElementById("life")
    const game = document.getElementById("game")
    const result = document.getElementById("result")
    const over = document.getElementById("over")
    const left = document.getElementById("left")
    const up = document.getElementById("up")
    const right = document.getElementById("right")
    const down = document.getElementById("down")

    let number_add = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

    let number_mul = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    let scores = 0
    scoreElement.textContent = "Score : "+scores
    let lifes = ["❤️", "❤️", "❤️", "❤️", "❤️"]
    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
    let numa1 = 0
    let numa2 = 0

    let numm1 = 0
    let numm2 = 0
    let adds = [numa1+" + "+numa2, numa1 + numa2]
    let subs = [adds[1]+" - "+numa2, adds[1] - numa2]
    let muls = [numm1+" x "+numm2, numm1 * numm2]
    let divs = [muls[1]+" ÷ "+numm2, muls[1] / numm2]
    let calc = [adds, subs, muls]
    let calc_pos = Math.floor(Math.random() * calc.length)
    let calcs = calc[calc_pos]
    let answer = calcs[1]
    let ques = calcs[0]
    let col = [ques, answer]
    let col_r = Math.floor(Math.random() * 2)
    let cols = col[col_r]

    one.textContent= cols
    if(one.textContent == answer) {
        let sel = [two, three, three, two]
        let sel_pos = Math.floor(Math.random() * 4)
        let sels = sel[sel_pos]
        sels.textContent = ques
        let x = sels.textContent
        if(sels !== three){
            let tr = x.split(" ")
            let num_pos = Math.floor(Math.random() * 10)
            let num = number_mul[num_pos]
            let tr1 = parseInt(tr[0]) + parseInt(num)
            let sen = tr1 + " " + tr[1] + " " + tr[2]
            three.textContent = sen
        }
        if(sels !== two){
            let tr = x.split(" ")
            let num_pos = Math.floor(Math.random() * 10)
            let num = number_mul[num_pos]
            let tr1 = parseInt(tr[0]) + parseInt(num)
            let sen = tr1 + " " + tr[1] + " " + tr[2]
            two.textContent = sen
        }
    }
    if(one.textContent == ques) {
        let sel = [two, three, three, two]
        let sel_pos = Math.floor(Math.random() * 4)
        let sels = sel[sel_pos]
        sels.textContent = answer
        let x = sels.textContent
        if(sels !== three){
            let tr = x.split(" ")
            let num_pos = Math.floor(Math.random() * 10)
            let num = number_mul[num_pos]
            let tr1 = parseInt(tr[0]) + parseInt(num)
            three.textContent = tr1
        }
        if(sels !== two){
            let tr = x.split(" ")
            let num_pos = Math.floor(Math.random() * 10)
            let num = number_mul[num_pos]
            let tr1 = parseInt(tr[0]) + parseInt(num)
            two.textContent = tr1
        }
    }

    let isDragging = false;
    let offsetX, offsetY;

    // Initial position
    let posX = 275;
    let posY = 175;
    updatePosition();

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      const speed = 10;
      switch(e.key) {
        case 'ArrowUp': posY -= speed; break;
        case 'ArrowDown': posY += speed; break;
        case 'ArrowLeft': posX -= speed; break;
        case 'ArrowRight': posX += speed; break;
      }
      updatePosition();
      checkCollision();
    });
    left.addEventListener("click", function() {
        let top = player.style.top
        player.style.cssText = "transition: all 5s;left: 0px;"+top
    });
    up.addEventListener("click", function() {
        let left = player.style.left
        player.style.cssText = "transition: all 5s;top: 0px;"+left
    });
    down.addEventListener("click", function() {
        let top = player.style.top
        player.style.cssText = "transition: all 5s;left: 490px;"+top
    });
    right.addEventListener("click", function() {
        let left = player.style.left
        player.style.cssText = "transition: all 5s;top: 300px;"+left
    });
    player.addEventListener("click", function() {
        player.style.cssText = "transition: none;"
    })

    // Drag controls
    player.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - posX;
      offsetY = e.clientY - posY;
      player.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      posX = e.clientX - offsetX;
      posY = e.clientY - offsetY;
      updatePosition();
      checkCollision();
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      player.style.cursor = 'move';
    });

    function updatePosition() {
      // Keep player within bounds
      posX = Math.max(0, Math.min(posX, 590));
      posY = Math.max(0, Math.min(posY, 400));
      
      player.style.left = posX + 'px';
      player.style.top = posY + 'px';
    }

    function checkCollision() {
      const playerRect = player.getBoundingClientRect();
      const target1Rect = target1.getBoundingClientRect();
      const target2Rect = target2.getBoundingClientRect();

      if (isColliding(playerRect, target1Rect)) {
        let ones = one.textContent.split(" ")
        let twos = two.textContent.split(" ")
        if(ones.length == 1){
            fie = two.textContent.split(" ")
            sym = fie[1]
            if(sym == "+"){
                ans = parseInt(fie[0]) + parseInt(fie[2])
                if(ans != one.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", two.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", two.textContent, one.textContent, ans)
                }
            }
            if(sym == "-"){
                ans = parseInt(fie[0]) - parseInt(fie[2])
                if(ans != one.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", two.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", two.textContent, one.textContent, ans)
                }
            }
            if(sym == "x"){
                ans = parseInt(fie[0]) * parseInt(fie[2])
                if(ans != one.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", two.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", two.textContent, one.textContent, ans)
                }
            }
            if(sym == "÷"){
                ans = parseInt(fie[0]) / parseInt(fie[2])
                if(ans != one.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", two.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", two.textContent, one.textContent, ans)
                }
            }
        }
        if(twos.length == 1){
            fie = one.textContent.split(" ")
            sym = fie[1]
            if(sym == "+"){
                ans = parseInt(fie[0]) + parseInt(fie[2])
                if(ans != two.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", two.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", two.textContent, one.textContent, ans)
                }
            }
            if(sym == "-"){
                ans = parseInt(fie[0]) - parseInt(fie[2])
                if(ans != two.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", two.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", two.textContent, one.textContent, ans)
                }
            }
            if(sym == "x"){
                ans = parseInt(fie[0]) * parseInt(fie[2])
                if(ans != two.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", two.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", two.textContent, one.textContent, ans)
                }
            }
            if(sym == "÷"){
                ans = parseInt(fie[0]) / parseInt(fie[2])
                if(ans != two.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", two.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", two.textContent, one.textContent, ans)
                }
            }
        }
        if(life.textContent !== "     "){
            let numa_pos1 = Math.floor(Math.random() * number_add.length)
            let numa_pos2 = Math.floor(Math.random() * number_mul.length)
            numa1 = number_add[numa_pos1]
            numa2 = number_add[numa_pos2]
            let numm_pos1 = Math.floor(Math.random() * number_mul.length)
            let numm_pos2 = Math.floor(Math.random() * number_mul.length)
            numm1 = number_mul[numm_pos1]
            numm2 = number_mul[numm_pos2]
            let adds = [numa1+" + "+numa2, numa1 + numa2]
            let subs = [adds[1]+" - "+numa2, adds[1] - numa2]
            let muls = [numm1+" x "+numm2, numm1 * numm2]
            let divs = [muls[1]+" ÷ "+numm2, muls[1] / numm2]
            let calc = [adds, subs, muls, divs]
            let calc_pos = Math.floor(Math.random() * calc.length)
            let calcs = calc[calc_pos]
            let answer = calcs[1]
            let ques = calcs[0]
            let col = [ques, answer]
            let col_r = Math.floor(Math.random() * 2)
            let cols = col[col_r]

            one.textContent= cols
            if(one.textContent == answer) {
                let sel = [two, three, three, two]
                let sel_pos = Math.floor(Math.random() * 4)
                let sels = sel[sel_pos]
                sels.textContent = ques
                let x = sels.textContent
                if(sels !== three){
                    let tr = x.split(" ")
                    let num_pos = Math.floor(Math.random() * 10)
                    let num = number_mul[num_pos]
                    let tr1 = parseInt(tr[0]) + parseInt(num)
                    let sen = tr1 + " " + tr[1] + " " + tr[2]
                    three.textContent = sen
                }
                if(sels !== two){
                    let tr = x.split(" ")
                    let num_pos = Math.floor(Math.random() * 10)
                    let num = number_mul[num_pos]
                    let tr1 = parseInt(tr[0]) + parseInt(num)
                    let sen = tr1 + " " + tr[1] + " " + tr[2]
                    two.textContent = sen
                }
            }
            if(one.textContent == ques) {
                let sel = [two, three, three, two]
                let sel_pos = Math.floor(Math.random() * 4)
                let sels = sel[sel_pos]
                sels.textContent = answer
                let x = sels.textContent
                if(sels !== three){
                    let tr = x.split(" ")
                    let num_pos = Math.floor(Math.random() * 10)
                    let num = number_mul[num_pos]
                    let tr1 = parseInt(tr[0]) + parseInt(num)
                    three.textContent = tr1
                }
                if(sels !== two){
                    let tr = x.split(" ")
                    let num_pos = Math.floor(Math.random() * 10)
                    let num = number_mul[num_pos]
                    let tr1 = parseInt(tr[0]) + parseInt(num)
                    two.textContent = tr1
                }
            }
        }else {
            over.textContent = "Game Over!"
            over.style.cssText = "animation-name: mot;animation-duration: 1.5s;"
        }
        handleCollision(target1);
      }
      
      if (isColliding(playerRect, target2Rect)) {
        target2.style.animation = "none"
        let ones = one.textContent.split(" ")
        let threes = three.textContent.split(" ")
        if(ones.length == 1){
            fie = three.textContent.split(" ")
            sym = fie[1]
            if(sym == "+"){
                ans = parseInt(fie[0]) + parseInt(fie[2])
                if(ans != one.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", three.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", three.textContent, one.textContent, ans)
                }
            }
            if(sym == "-"){
                ans = parseInt(fie[0]) - parseInt(fie[2])
                if(ans != one.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", three.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", three.textContent, one.textContent, ans)
                }
            }
            if(sym == "x"){
                ans = parseInt(fie[0]) * parseInt(fie[2])
                if(ans != one.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", three.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", three.textContent, one.textContent, ans)
                }
            }
            if(sym == "÷"){
                ans = parseInt(fie[0]) / parseInt(fie[2])
                if(ans != one.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", three.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", three.textContent, one.textContent, ans)
                }
            }
        }
        if(threes.length == 1){
            fie = one.textContent.split(" ")
            sym = fie[1]
            if(sym == "+"){
                ans = parseInt(fie[0]) + parseInt(fie[2])
                if(ans != three.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", three.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", three.textContent, one.textContent, ans)
                }
            }
            if(sym == "-"){
                ans = parseInt(fie[0]) - parseInt(fie[2])
                if(ans != three.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", three.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", three.textContent, one.textContent, ans)
                }
            }
            if(sym == "x"){
                ans = parseInt(fie[0]) * parseInt(fie[2])
                if(ans != three.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", three.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", three.textContent, one.textContent, ans)
                }
            }
            if(sym == "÷"){
                ans = parseInt(fie[0]) / parseInt(fie[2])
                if(ans != three.textContent){
                    game.textContent = "Wrong!"
                    game.style.cssText = "color: red;"
                    result.textContent = "Correct Answer is "+ans
                    result.style.cssText = "color: cyan;"
                    lifes.push(" ")
                    lifes.shift()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    console.log("wrong", three.textContent, one.textContent, ans)
                }else {
                    game.textContent = "Correct!"
                    game.style.cssText = "color: green;"
                    result.textContent = ""
                    scores += 1
                    scoreElement.textContent = "Score : "+scores
                    if(lifes != ["❤️", "❤️", "❤️", "❤️", "❤️"]) {
                    lifes.unshift("❤️")
                    lifes.pop()
                    life.textContent = lifes[0]+lifes[1]+lifes[2]+lifes[3]+lifes[4]
                    }
                    console.log("correct", three.textContent, one.textContent, ans)
                }
            }
        }
        if(life.textContent !== "     "){
            let numa_pos1 = Math.floor(Math.random() * number_add.length)
            let numa_pos2 = Math.floor(Math.random() * number_mul.length)
            numa1 = number_add[numa_pos1]
            numa2 = number_add[numa_pos2]
            let numm_pos1 = Math.floor(Math.random() * number_mul.length)
            let numm_pos2 = Math.floor(Math.random() * number_mul.length)
            numm1 = number_mul[numm_pos1]
            numm2 = number_mul[numm_pos2]
            let adds = [numa1+" + "+numa2, numa1 + numa2]
            let subs = [adds[1]+" - "+numa2, adds[1] - numa2]
            let muls = [numm1+" x "+numm2, numm1 * numm2]
            let divs = [muls[1]+" ÷ "+numm2, muls[1] / numm2]
            let calc = [adds, subs, muls, divs]
            let calc_pos = Math.floor(Math.random() * calc.length)
            let calcs = calc[calc_pos]
            let answer = calcs[1]
            let ques = calcs[0]
            let col = [ques, answer]
            let col_r = Math.floor(Math.random() * 2)
            let cols = col[col_r]

            one.textContent= cols
            if(one.textContent == answer) {
                let sel = [two, three, three, two]
                let sel_pos = Math.floor(Math.random() * 4)
                let sels = sel[sel_pos]
                sels.textContent = ques
                let x = sels.textContent
                if(sels !== three){
                    let tr = x.split(" ")
                    let num_pos = Math.floor(Math.random() * 10)
                    let num = number_mul[num_pos]
                    let tr1 = parseInt(tr[0]) + parseInt(num)
                    let sen = tr1 + " " + tr[1] + " " + tr[2]
                    three.textContent = sen
                }
                if(sels !== two){
                    let tr = x.split(" ")
                    let num_pos = Math.floor(Math.random() * 10)
                    let num = number_mul[num_pos]
                    let tr1 = parseInt(tr[0]) + parseInt(num)
                    let sen = tr1 + " " + tr[1] + " " + tr[2]
                    two.textContent = sen
                }
            }
            if(one.textContent == ques) {
                let sel = [two, three, three, two]
                let sel_pos = Math.floor(Math.random() * 4)
                let sels = sel[sel_pos]
                sels.textContent = answer
                let x = sels.textContent
                if(sels !== three){
                    let tr = x.split(" ")
                    let num_pos = Math.floor(Math.random() * 10)
                    let num = number_mul[num_pos]
                    let tr1 = parseInt(tr[0]) + parseInt(num)
                    three.textContent = tr1
                }
                if(sels !== two){
                    let tr = x.split(" ")
                    let num_pos = Math.floor(Math.random() * 10)
                    let num = number_mul[num_pos]
                    let tr1 = parseInt(tr[0]) + parseInt(num)
                    two.textContent = tr1
                }
            }
        }else {
            over.textContent = "Game Over!"
            over.style.cssText = "animation-name: mot;animation-duration: 1.5s;"
        }
        handleCollision(target2);
      }
    }

    function isColliding(rect1, rect2) {
      return !(
        rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom
      );
    }

    function handleCollision(target) {      
      // Move target to random position
      const newX = Math.random() * 550;
      const newY = Math.random() * 350;
      target.style.left = newX + 'px';
      target.style.top = newY + 'px';
    }
});