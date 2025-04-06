document.addEventListener('DOMContentLoaded', function() {
    const answer = document.getElementById("answer")
    const one = document.getElementById("one")
    const two = document.getElementById("two")
    const three = document.getElementById("three")
    const warn = document.getElementById("warn")
    const cal = document.getElementById("cal")

    cal.addEventListener(("mouseover"), function() {
        if(one.value == ""){
            if(two.value == ""){
                if(three.value == ""){
                    warn.textContent = "Please enter value in any form and click and click the button."
                    cal.style.cssText = "animation-name: move;animation-duration: 1.9s;animation-iteration-count: infinite;"
                    cal.textContent = "😁😂😁"
                }
            }
        }
    })
    cal.addEventListener(("click"), function() {
        if(one.value !== "") {
            cal.style.cssText = "animation-name: move;animation-duration: 100s;animation-iteration-count: 0;"
            cal.textContent = "Calculate"
            warn.textContent = ""
            if(one.value == parseFloat(one.value) && two.value == parseFloat(two.value) && three.value == "") {
                answer.textContent = one.value / two.value
                three.value = one.value / two.value
            }
            if(one.value == parseFloat(one.value) && three.value == parseFloat(three.value) && two.value == "") {
                answer.textContent = one.value / three.value
                two.value = one.value / three.value
            }
        }
        if(two.value !== "") {
            cal.style.cssText = "animation-name: move;animation-duration: 100s;animation-iteration-count: 0;"
            cal.textContent = "Calculate"
            warn.textContent = ""
            if(two.value == parseFloat(two.value) && three.value == parseFloat(three.value) && one.value == "") {
                answer.textContent = two.value * three.value
                one.value = two.value * three.value
            }
        }
        if(three.value !== "") {
            cal.style.cssText = "animation-name: move;animation-duration: 100s;animation-iteration-count: 0;"
            cal.textContent = "Calculate"
            warn.textContent = ""
        }
    })
});