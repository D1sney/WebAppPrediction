// Select all custom number elements on the page
// const customNum = document.querySelectorAll('.text-field')


// --------- TG WEB APP --------- 
let tg = window.Telegram.WebApp;

tg.expand()

// стили для MainButton
tg.MainButton.textColor = '#ffffff'
tg.MainButton.color = '#6600ff'
tg.MainButton.setText("Создать матч");
tg.MainButton.show();

// Фиксированное название события нажатия на главную кнопку в телеграмме
Telegram.WebApp.onEvent('mainButtonClicked', function() {
    const matchData = {}
    
    matchData['firstTeam'] = document.getElementById('first-team').value
    matchData['secondTeam'] = document.getElementById('second-team').value
    matchData['tourDate'] = document.getElementById('tour-date').value
    tg.sendData(JSON.stringify(matchData));
})