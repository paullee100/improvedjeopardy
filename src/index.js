const mainScreenContainer = document.querySelector('.main-screen-container');
const promptContainer = document.querySelector('.container');
const inputContainer = document.querySelector('.input-container');

const categoryRow = document.getElementById('category_row');
const firstRow = document.getElementById('first_row');
const secondRow = document.getElementById('second_row');
const thirdRow = document.getElementById('third_row');
const fourthRow = document.getElementById('fourth_row');
const fifthRow = document.getElementById('fifth_row');

const prompt = document.querySelector('.prompt');
const dailyDoublePrompt = document.querySelector('.daily-double');
const timer = document.querySelector('.timer');
const answer = document.querySelector('.answer');

const file = document.getElementById('file');
const uploadButton = document.getElementById('uploadNewData');

const tableOfPoints = [undefined, document.getElementById('group-one-points'), document.getElementById('group-two-points'), document.getElementById('group-three-points'), document.getElementById('group-four-points'), document.getElementById('group-five-points'), document.getElementById('group-six-points'), document.getElementById('group-seven-points'), document.getElementById('group-eight-points')]
const tableOfInputPoints = [undefined, document.getElementById('input-group-one'), document.getElementById('input-group-two'), document.getElementById('input-group-three'), document.getElementById('input-group-four'), document.getElementById('input-group-five'), document.getElementById('input-group-six'), document.getElementById('input-group-seven'), document.getElementById('input-group-eight')];

let promptSection = '';
let answerSection = '';
const listOfRows = [categoryRow, firstRow, secondRow, thirdRow, fourthRow, fifthRow]
const dailyDouble = [];
for (let i = 0; i < 6; i++) {
    dailyDouble.push([]);
    for (let j = 0; j < 6; j++) {
        dailyDouble[i].push(false);
    }
}

rounds = []
roundNum = 0;
listOfItems = [];
for (let i = 0; i < 6; i++) {
    listOfItems.push([]);
}

round = { // row by row
    category: [],
    rowOneColOne: ['Prompt1', 'Answer1'],
    rowOneColTwo: ['Prompt2', 'Answer2'],
    rowOneColThree: ['Prompt3', 'Answer3'],
    rowOneColFour: ['Prompt4', 'Answer4'],
    rowOneColFive: ['Prompt5', 'Answer5'],
    rowOneColSix: ['Prompt6', 'Answer6'],

    rowTwoColOne: ['Prompt7', 'Answer7'],
    rowTwoColTwo: ['Prompt8', 'Answer8'],
    rowTwoColThree: ['Prompt9', 'Answer9'],
    rowTwoColFour: ['Prompt10', 'Answer10'],
    rowTwoColFive: ['Prompt11', 'Answer11'],
    rowTwoColSix: ['Prompt12', 'Answer12'],

    rowThreeColOne: ['Prompt13', 'Answer13'],
    rowThreeColTwo: ['Prompt14', 'Answer14'],
    rowThreeColThree: ['Prompt15', 'Answer15'],
    rowThreeColFour: ['Prompt16', 'Answer16'],
    rowThreeColFive: ['Prompt17', 'Answer17'],
    rowThreeColSix: ['Prompt18', 'Answer18'],

    rowFourColOne: ['Prompt19', 'Answer19'],
    rowFourColTwo: ['Prompt20', 'Answer20'],
    rowFourColThree: ['Prompt21', 'Answer21'],
    rowFourColFour: ['Prompt22', 'Answer22'],
    rowFourColFive: ['Prompt23', 'Answer23'],
    rowFourColSix: ['Prompt24', 'Answer24'],

    rowFiveColOne: ['Prompt25', 'Answer25'],
    rowFiveColTwo: ['Prompt26', 'Answer26'],
    rowFiveColThree: ['Prompt27', 'Answer27'],
    rowFiveColFour: ['Prompt28', 'Answer28'],
    rowFiveColFive: ['Prompt29', 'Answer29'],
    rowFiveColSix: ['Prompt30', 'Answer30'],

    finalPrompt: '',
    finalAnswer: ''
}
round.category.push([]);
round.category.push([]);
round.category.push([]);
let isMainScreen = false;

document.addEventListener(
    'keydown', (e) => {
        if (e.key === "Backspace" && !isMainScreen) {
            goBackToMainScreen();
        } else if (e.key === " ") {
            e.preventDefault();
            if (confirm("Are you sure you want to go onto the next round?")) {
                updateRound();
            }
        } else if (e.key === "r") {
            prompt.style.display = 'flex';
        }
    }
)

function updateRound() {
    roundNum++;
    if (roundNum == 2) {
        promptContainer.style.display = 'flex';
        mainScreenContainer.style.display = 'none';
        finalRound();
    } else {
        for (let i = 0; i < firstRow.children.length; i++) {
            firstRow.children[i].id = "unrevealed";
            secondRow.children[i].id = "unrevealed";
            thirdRow.children[i].id = "unrevealed";
            fourthRow.children[i].id = "unrevealed";
            fifthRow.children[i].id = "unrevealed";
        }
        randomizeDailyDouble();
        placeLabel();
        updateLabel();
    }
}

function finalRound() {
    prompt.style.display = 'none';
    promptContainer.style.display = 'flex';
    round.finalPrompt = listOfItems[roundNum][0];
    answerSection = listOfItems[roundNum][1];
    prompt.style.color = "white";
    prompt.innerHTML = round.finalPrompt;
    prompt.style.fontSize = 60 + 'px';
    timer.style.display = 'flex';
    promptContainer.addEventListener('click', () => startCountdown(60, timer));
    promptContainer.addEventListener('contextmenu', revealAnswer);
}

function startCountdown(duration, display) {
    const music = '../sounds/jeopardyMusic.mp4';
    const audio = new Audio(music);
    audio.play();
    let timer = duration, minutes, seconds;
    const id = setInterval(countdownTimer, 1000);

    function countdownTimer() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes: minutes;
        seconds = seconds < 10 ? "0" + seconds: seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(id);
            audio.pause();
        }
    }
}

function updateLabel() {

    round.rowOneColOne = [listOfItems[roundNum][0], listOfItems[roundNum][1]];
    round.rowOneColTwo = [listOfItems[roundNum][2], listOfItems[roundNum][3]];
    round.rowOneColThree = [listOfItems[roundNum][4], listOfItems[roundNum][5]];
    round.rowOneColFour = [listOfItems[roundNum][6], listOfItems[roundNum][7]];
    round.rowOneColFive = [listOfItems[roundNum][8], listOfItems[roundNum][9]];
    round.rowOneColSix = [listOfItems[roundNum][10], listOfItems[roundNum][11]];

    // R
    round.rowTwoColOne = [listOfItems[roundNum][12], listOfItems[roundNum][13]];
    round.rowTwoColTwo = [listOfItems[roundNum][14], listOfItems[roundNum][15]];
    round.rowTwoColThree = [listOfItems[roundNum][16], listOfItems[roundNum][17]];
    round.rowTwoColFour = [listOfItems[roundNum][18], listOfItems[roundNum][19]];
    round.rowTwoColFive = [listOfItems[roundNum][20], listOfItems[roundNum][21]];
    round.rowTwoColSix = [listOfItems[roundNum][22], listOfItems[roundNum][23]];

    round.rowThreeColOne = [listOfItems[roundNum][24], listOfItems[roundNum][25]];
    round.rowThreeColTwo = [listOfItems[roundNum][26], listOfItems[roundNum][27]];
    round.rowThreeColThree = [listOfItems[roundNum][28], listOfItems[roundNum][29]];
    round.rowThreeColFour = [listOfItems[roundNum][30], listOfItems[roundNum][31]];
    round.rowThreeColFive = [listOfItems[roundNum][32], listOfItems[roundNum][33]];
    round.rowThreeColSix = [listOfItems[roundNum][34], listOfItems[roundNum][35]];

    round.rowFourColOne = [listOfItems[roundNum][36], listOfItems[roundNum][37]];
    round.rowFourColTwo = [listOfItems[roundNum][38], listOfItems[roundNum][39]];
    round.rowFourColThree = [listOfItems[roundNum][40], listOfItems[roundNum][41]];
    round.rowFourColFour = [listOfItems[roundNum][42], listOfItems[roundNum][43]];
    round.rowFourColFive = [listOfItems[roundNum][44], listOfItems[roundNum][45]];
    round.rowFourColSix = [listOfItems[roundNum][46], listOfItems[roundNum][47]];

    round.rowFiveColOne = [listOfItems[roundNum][48], listOfItems[roundNum][49]];
    round.rowFiveColTwo = [listOfItems[roundNum][50], listOfItems[roundNum][51]];
    round.rowFiveColThree = [listOfItems[roundNum][52], listOfItems[roundNum][53]];
    round.rowFiveColFour = [listOfItems[roundNum][54], listOfItems[roundNum][55]];
    round.rowFiveColFive = [listOfItems[roundNum][56], listOfItems[roundNum][57]];
    round.rowFiveColSix = [listOfItems[roundNum][58], listOfItems[roundNum][59]];
}

function randomizeDailyDouble() {
    // row 3 to 5
    dailyDoubleRow = Math.floor(Math.random() * (6 - 3) + 3);
    // col 1 to 6
    dailyDoubleCol = Math.floor(Math.random() * 6 + 1);

    // console.log(dailyDoubleRow);
    // console.log(dailyDoubleCol);
    dailyDouble[dailyDoubleRow][dailyDoubleCol-1] = true;
}

function placeLabel() {
    for (let i = 0; i < firstRow.children.length; i++) {
        categoryRow.children[i].style.color = "white";
        categoryRow.children[i].innerHTML = round.category[roundNum][i];
        if (firstRow.children[i].id === "unrevealed") {
            firstRow.children[i].style.color = "white";
            firstRow.children[i].innerHTML = 200 * (roundNum+1);
        } else {
            firstRow.children[i].innerHTML = '';
        }
        if (secondRow.children[i].id === "unrevealed") {
            secondRow.children[i].style.color = "white";
            secondRow.children[i].innerHTML = 400 * (roundNum+1);
        } else {
            secondRow.children[i].innerHTML = '';
        }
        if (thirdRow.children[i].id === "unrevealed") {
            thirdRow.children[i].style.color = "white";
            thirdRow.children[i].innerHTML = 600 * (roundNum+1);
        } else {
            thirdRow.children[i].innerHTML = '';
        }
        if (fourthRow.children[i].id === "unrevealed") {
            fourthRow.children[i].style.color = "white";
            fourthRow.children[i].innerHTML = 800 * (roundNum+1);
        } else {
            fourthRow.children[i].innerHTML = '';
        }
        if (fifthRow.children[i].id === "unrevealed") {
            fifthRow.children[i].style.color = "white";
            fifthRow.children[i].innerHTML = 1000 * (roundNum+1);
        } else {
            fifthRow.children[i].innerHTML = '';
        }
    }
}

function addListenerToTopics() {
    for (let i = 0; i < firstRow.children.length; i++) {
        if (firstRow.children[i].id === "unrevealed") {
            firstRow.children[i].addEventListener('click', () => displayPrompt(1, i+1));
        }
        if (secondRow.children[i].id === "unrevealed") {
            secondRow.children[i].addEventListener('click', () => displayPrompt(2, i+1));
        }
        if (thirdRow.children[i].id === "unrevealed") {
            thirdRow.children[i].addEventListener('click', () => displayPrompt(3, i+1));
        }
        if (fourthRow.children[i].id === "unrevealed") {
            fourthRow.children[i].addEventListener('click', () => displayPrompt(4, i+1));
        }
        if (fifthRow.children[i].id === "unrevealed") {
            fifthRow.children[i].addEventListener('click', () => displayPrompt(5, i+1));
        }
    }
}

function revealAnswer(event) {
    event.preventDefault();
    console.log("answer revealed!");
    answer.style.color = "white";
    answer.innerHTML = answerSection;
    answer.style.fontSize = 60 + 'px';
    answer.style.display = 'flex';
    console.log(answer.innerHTML);
}

function showPromptWhenDailyDouble(event) {
    event.preventDefault();
    dailyDoublePrompt.style.display = 'none';
    prompt.style.display = 'flex';
    prompt.style.color = 'white';
    dailyDoublePrompt.removeEventListener('click', showPromptWhenDailyDouble);
    promptContainer.addEventListener('contextmenu', revealAnswer)
}

function displayPrompt(row, col) {
    if (listOfRows[row].children[col-1].id === "revealed") return;

    promptSection = '';
    answerSection = '';
    if (dailyDouble[row][col-1]) {
        dailyDouble[row][col-1] = false;
        dailyDoublePrompt.style.display = 'flex';
        prompt.style.display = 'none';
        listOfRows[row].children[col-1].removeEventListener('click', () => displayPrompt(row, col));
        dailyDoublePrompt.addEventListener('click', showPromptWhenDailyDouble);
    } else {
        promptContainer.addEventListener('contextmenu', revealAnswer);
    }

    if (row == 1) {
        switch(col) {
            case 1:
                promptSection = round.rowOneColOne[0];
                answerSection = round.rowOneColOne[1];
                break;
            case 2:
                promptSection = round.rowOneColTwo[0];
                answerSection = round.rowOneColTwo[1];
                break;
            case 3:
                promptSection = round.rowOneColThree[0];
                answerSection = round.rowOneColThree[1];
                break;
            case 4:
                promptSection = round.rowOneColFour[0];
                answerSection = round.rowOneColFour[1];
                break;
            case 5:
                promptSection = round.rowOneColFive[0];
                answerSection = round.rowOneColFive[1];
                break;
            case 6:
                promptSection = round.rowOneColSix[0];
                answerSection = round.rowOneColSix[1];
                break;
        }
    } else if (row == 2) {
        switch(col) {
            case 1:
                promptSection = round.rowTwoColOne[0];
                answerSection = round.rowTwoColOne[1];
                break;
            case 2:
                promptSection = round.rowTwoColTwo[0];
                answerSection = round.rowTwoColTwo[1];
                break;
            case 3:
                promptSection = round.rowTwoColThree[0];
                answerSection = round.rowTwoColThree[1];
                break;
            case 4:
                promptSection = round.rowTwoColFour[0];
                answerSection = round.rowTwoColFour[1];
                break;
            case 5:
                promptSection = round.rowTwoColFive[0];
                answerSection = round.rowTwoColFive[1];
                break;
            case 6:
                promptSection = round.rowTwoColSix[0];
                answerSection = round.rowTwoColSix[1];
                break;
        }
    } else if (row == 3) {
        switch(col) {
            case 1:
                promptSection = round.rowThreeColOne[0];
                answerSection = round.rowThreeColOne[1];
                break;
            case 2:
                promptSection = round.rowThreeColTwo[0];
                answerSection = round.rowThreeColTwo[1];
                break;
            case 3:
                promptSection = round.rowThreeColThree[0];
                answerSection = round.rowThreeColThree[1];
                break;
            case 4:
                promptSection = round.rowThreeColFour[0];
                answerSection = round.rowThreeColFour[1];
                break;
            case 5:
                promptSection = round.rowThreeColFive[0];
                answerSection = round.rowThreeColFive[1];
                break;
            case 6:
                promptSection = round.rowThreeColSix[0];
                answerSection = round.rowThreeColSix[1];
                break;
        }
    } else if (row == 4) {
        switch(col) {
            case 1:
                promptSection = round.rowFourColOne[0];
                answerSection = round.rowFourColOne[1];
                break;
            case 2:
                promptSection = round.rowFourColTwo[0];
                answerSection = round.rowFourColTwo[1];
                break;
            case 3:
                promptSection = round.rowFourColThree[0];
                answerSection = round.rowFourColThree[1];
                break;
            case 4:
                promptSection = round.rowFourColFour[0];
                answerSection = round.rowFourColFour[1];
                break;
            case 5:
                promptSection = round.rowFourColFive[0];
                answerSection = round.rowFourColFive[1];
                break;
            case 6:
                promptSection = round.rowFourColSix[0];
                answerSection = round.rowFourColSix[1];
                break;
        }
    } else if (row == 5) {
        switch(col) {
            case 1:
                promptSection = round.rowFiveColOne[0];
                answerSection = round.rowFiveColOne[1];
                break;
            case 2:
                promptSection = round.rowFiveColTwo[0];
                answerSection = round.rowFiveColTwo[1];
                break;
            case 3:
                promptSection = round.rowFiveColThree[0];
                answerSection = round.rowFiveColThree[1];
                break;
            case 4:
                promptSection = round.rowFiveColFour[0];
                answerSection = round.rowFiveColFour[1];
                break;
            case 5:
                promptSection = round.rowFiveColFive[0];
                answerSection = round.rowFiveColFive[1];
                break;
            case 6:
                promptSection = round.rowFiveColSix[0];
                answerSection = round.rowFiveColSix[1];
                break;
        }
    }
    
    for (i = 1; i < tableOfInputPoints.length; i++) {
        tableOfInputPoints[i].value = parseInt(listOfRows[row].children[col-1].innerHTML, 10);
    }

    promptContainer.style.display = 'flex';
    mainScreenContainer.style.display = 'none';
    prompt.innerHTML = promptSection;
    prompt.style.color = 'white';
    prompt.style.fontSize = 60 + 'px';
    listOfRows[row].children[col-1].id = 'revealed';
}

function goBackToMainScreen() {
    promptContainer.style.display = 'none';
    mainScreenContainer.style.display = 'grid';
    answer.style.display = 'none';
    promptContainer.removeEventListener('contextmenu', revealAnswer);
    placeLabel();
}

function uploadFile() {
    if (file.files.length == 0) {
        uploadButton.disabled = true;
    } else {
        uploadButton.disabled = false;
        uploadButton.addEventListener('click', () => confirmUploadFile())
    }
}

function confirmUploadFile() {
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
        const data = this.result.split('\r\n');
        // console.log(data);
        for (let i = 0; i < 6; i++) {
            if (data[i].includes('#')) {
                continue;
            }
            round.category[0].push(data[i]);
        }

        for (let i = 7; i < data.length; i++) {
            if (data[i] === '---') {
                break;
            }
            if (data[i].includes('#')) {
                continue;
            }
            listOfItems[0].push(data[i]);
        }

        for (let i = 72; i < 78; i++) {
            if (data[i].includes('#')) {
                continue;
            }
            round.category[1].push(data[i]);
        }

        for (let i = 79; i < data.length; i++) {
            if (data[i] === '---') {
                break;
            }
            if (data[i].includes('#')) {
                continue;
            }
            listOfItems[1].push(data[i]);
        }

        for (let i = data.length-2; i < data.length; i++) {
            listOfItems[2].push(data[i]);
        }

        placeLabel();
        updateLabel();
        inputContainer.style.display = 'none';
    }

    fileReader.readAsText(file.files[0]);
}

function addPoints(group) {
    if (tableOfInputPoints[group].value == '') return;
    intValue = parseInt(tableOfPoints[group].innerHTML, 10);
    newValue = intValue + parseInt(tableOfInputPoints[group].value, 10);
    tableOfPoints[group].innerHTML = newValue;
    // tableOfInputPoints[group].value = '';
}

function minusPoints(group) {
    if (tableOfInputPoints[group].value == '') return;
    intValue = parseInt(tableOfPoints[group].innerHTML, 10);
    newValue = intValue - parseInt(tableOfInputPoints[group].value, 10);
    tableOfPoints[group].innerHTML = newValue;
    // tableOfInputPoints[group].value = '';
}

placeLabel();
addListenerToTopics();
randomizeDailyDouble();