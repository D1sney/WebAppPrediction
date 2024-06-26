// Select all custom number elements on the page
// const customNum = document.querySelectorAll('.text-field')


// --------- TG WEB APP --------- 
Telegram.WebApp.ready();

let tg = window.Telegram.WebApp;


// стили для MainButton
tg.MainButton.textColor = '#ffffff'
tg.MainButton.color = '#6600ff'
tg.MainButton.setText("Создать матч");
tg.MainButton.show();

// Фиксированное название события нажатия на главную кнопку в телеграмме
tg.onEvent('mainButtonClicked', function() {
    const matchData = {}
    
    matchData['firstTeam'] = document.getElementById('first-team').value
    matchData['secondTeam'] = document.getElementById('second-team').value
    matchData['tourDate'] = document.getElementById('tour-date').value
    tg.sendData(JSON.stringify(matchData));
})