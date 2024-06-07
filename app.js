// Select all custom number elements on the page
const customNum = document.querySelectorAll('.custom-num')
// for testing
// const scoreData = {}
// for (let i = 0; i < customNum.length; i++) {
//     scoreData[i] = customNum[i].querySelector('.num-input').value
// }
// console.log(scoreData)

customNum.forEach(num => {
    const numInput = num.querySelector('.num-input')
    const arrUp = num.querySelector('.arr-up')
    const arrDown = num.querySelector('.arr-down')
    numInput.style.color = numInput.dataset.color

    // click event for the up arrow
    arrUp.addEventListener('click', () => {
        numInput.stepUp()
        checkMaxMin()
        tg.MainButton.show()
    })

    // click event for the down arrow
    arrDown.addEventListener('click', () => {
        numInput.stepDown()
        checkMaxMin()
        tg.MainButton.show()
    })

    // add input event for input element
    numInput.addEventListener('input', checkMaxMin)
    function checkMaxMin() {
        // get current input value
        const numInputValue = parseInt(numInput.value)
        // get max input value set in HTML max attribute
        const numInputMax = parseInt(numInput.max)
        // get min input value set in HTML min attribute
        const numInputMin = parseInt(numInput.min)

        // if the max limit is reached
        if (numInputValue === numInputMax) {
            num.style.paddingTop = '2em'
            num.style.height = '5em'
            arrUp.style.display = 'none'
            
            // remove style for the min limit
            num.style.paddingBottom = '0'
            arrDown.style.display = 'block'
        // if the min limit is reached
        } else if (numInputValue === numInputMin) {
            num.style.paddingBottom = '2em'
            num.style.height = '5em'
            arrDown.style.display = 'none'
            
            // remove style for the max limit
            num.style.paddingTop = '0'
            arrUp.style.display = 'block'
        } else {
            // remove all limit reach styles
            num.style.padding = '0'
            num.style.height = '7em'
            arrUp.style.display = 'block'
            arrDown.style.display = 'block'
        }
    }
})

// --------- TG WEB APP --------- 
let tg = window.Telegram.WebApp;

tg.expand()

// стили для MainButton
tg.MainButton.textColor = '#1b1c23'
tg.MainButton.color = '#6600ff'
tg.MainButton.setText("Подтвердить прогноз");
tg.MainButton.show();

// Фиксированное название события нажатия на главную кнопку в телеграмме
Telegram.WebApp.onEvent('mainButtonClicked', function() {
    const scoreData = {}
    // customNum.forEach(num => {
    //     const numInput = num.querySelector('.num-input')        
    // })
    for (let i = 0; i < customNum.length; i++) {
        scoreData[i] = customNum[i].querySelector('.num-input').value
    }
    tg.sendData(JSON.stringify(scoreData));
})