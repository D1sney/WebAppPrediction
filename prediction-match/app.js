const main = document.getElementById('main')
// '[England-Germany,Italy-Spain,France-Belgium]'
const urlParams = new URLSearchParams(window.location.search);


// По ключу matches из строки делаес список матчей
function getListMatches() {
    const matchesParam = urlParams.get('matches');
    // const matchesParam = '[England-Germany,Italy-Spain,France-Belgium]'
    matches = matchesParam.slice(1, -1).split(',');
    return matches
}

// Из списка матчей делаем словарь с данными о первой команде, второй команде, аббравиатуре первой и второй команде
function generate_matches(list_matches) {
    let matches_data = []
    for (let i = 0; i < list_matches.length; i++) {
        matches_data[i] = {}
        matches_data[i]['firstTeam'] = list_matches[i].split('-')[0].trim();
        matches_data[i]['secondTeam'] = list_matches[i].split('-')[1].trim();
        matches_data[i]['firstAbb'] = list_matches[i].split('-')[0].trim().toUpperCase().slice(0,3);
        matches_data[i]['secondAbb'] = list_matches[i].split('-')[1].trim().toUpperCase().slice(0,3);
    }
    return matches_data
}

// Рэндерим все матчи с нужными id
function render(values) {
    for (let i = 0; i < values.length; i++) {
        main.insertAdjacentHTML('beforeend', `<div id="match-${i}">
            <div class="match-title">
            <i id="tg-first-team">${values[i]['firstTeam']}</i>
            <i id="tg-second-team">${values[i]['secondTeam']}</i>
        </div>

        <div class="match-score">
            <i id="first-team">${values[i]['firstAbb']}</i>
            <div class="custom-num">
                <i class="ri-arrow-up-wide-line arr-up"></i>
                <input type="number" class="num-input" min="0" max="20" value="0" data-color="#6600ff">
                <i class="ri-arrow-down-wide-line arr-down"></i>
            </div>
            <i id="colon">:</i>
            <div class="custom-num">
                <i class="ri-arrow-up-wide-line arr-up"></i>
                <input type="number" class="num-input" min="0" max="20" value="0" data-color="#6600ff">
                <i class="ri-arrow-down-wide-line arr-down"></i>
            </div>
            <i id="second-team">${values[i]['secondAbb']}</i>
        </div>
        </div>`)}}

function mainRender() {
    render(generate_matches(getListMatches()))
}
mainRender()


// Делаем функционал для num input
const customNum = document.querySelectorAll('.custom-num')

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
tg.MainButton.textColor = '#ffffff'
tg.MainButton.color = '#6600ff'
tg.MainButton.setText("Подтвердить прогноз");
tg.MainButton.show();

// Фиксированное название события нажатия на главную кнопку в телеграмме
Telegram.WebApp.onEvent('mainButtonClicked', function() {
    const button = urlParams.get('button');
    matches = getListMatches()
    const scoreData = generate_matches(matches)
    for (let i = 0; i < matches.length; i++) {
        const match = document.getElementById(`match-${i}`)
        numInputs = match.querySelectorAll('.num-input')
        scoreData[i]['firstScore'] = numInputs[0].value;
        scoreData[i]['secondScore'] = numInputs[1].value;
    }
    scoreData.push(button);
    tg.sendData(JSON.stringify(scoreData));
})
