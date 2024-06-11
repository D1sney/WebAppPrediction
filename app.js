// Select all custom number elements on the page
// const customNum = document.querySelectorAll('.text-field')


// --------- TG WEB APP --------- 
let tg = window.Telegram.WebApp;

tg.expand()

// стили для MainButton
tg.MainButton.textColor = '#21d99b'
tg.MainButton.color = '#6600ff'
tg.MainButton.setText("Создать матч");
tg.MainButton.show();

// Фиксированное название события нажатия на главную кнопку в телеграмме
Telegram.WebApp.onEvent('mainButtonClicked', function() {
    const matchData = {}
    
    for (let i = 0; i < customNum.length; i++) {
        matchData[i] = customNum[i].querySelector('.text-field__inp').value
    }
    tg.sendData(JSON.stringify(scoreData));
})