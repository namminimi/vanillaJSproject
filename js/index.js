//데이터를 받아주는 함수를 따로만들고 그 데이터는 객체에 저장한다
//저장한 데이터를 뿌려주는 map함수를 따로만든다
//게임 첫 시작때 데이터뿌려주는 map함수 아규먼트에 데이터 객체값을 넣어준다
//map함수에서 글자를 ?로 변경해서 첫 문제를 랜더링함
//키 이벤트를 사용하여 객체에 저장된 데이터값 글자와 맞을 경우 다시 map함수를 돌려서 맞춘 글자는 오픈되고 나머지 글자는 ?가된다
//여기서 문제점 입력값과 일치할 경우 글자 오픈은 되는데

const missionElement = $('.mission');

/* 문장 저장 */
const missionWord = {
    inputWord: "",
    newInputWord: "",
};


function $(selector) {
    return document.querySelector(selector);
}
/* 데이터 생성 */
const createJsonWords = async () => {
    const response = await fetch('../world.json');
    const result = await response.json();
    const {practice} = result;

    const number = Math.floor(Math.random() * practice.length);
    const {mission} = practice[number];
    missionWord.inputWord = mission;
    return mission;
}

/* 퀴즈 생성 */
const createQuiz = (data, space = null) => {
  
    const {newInputWord} = missionWord;
    
    let changeWord = "";
    data.split("").map((word, index) => {
        const divElement = document.createElement('div')
        divElement.classList.add('word');
        /* 출력문자 물음표로 변경 */
     
        let replaceStar = "";
        if(word !== " ") {
            replaceStar = word.replace(word, '?'); 
        } else {
            replaceStar = word.replace(word, ' '); 
        }
        if(space === index) {
            replaceStar = word;
        }
        if(newInputWord !== "" && newInputWord[index] !== "?") {
            replaceStar = word;
        }
        changeWord += replaceStar;
        divElement.innerHTML = `<h3>${replaceStar}</h3><span></span>`;
        missionElement.append(divElement);
    })

    missionWord.newInputWord = changeWord;
}

/* 키입력 시 글자 오픈 */
const handleKeydown = (event) => {
    const {inputWord, newInputWord} = missionWord;
    const {key} = event;
    const upperKey = key.toUpperCase()

    const indexNumber = inputWord.indexOf(upperKey)
    missionElement.innerHTML = "";
    createQuiz(inputWord, indexNumber);
}

/* 리셋 클릭 했을 때 글자 생성 */
const handleClick = async () => {
    missionWord.inputWord = "";
    missionWord.newInputWord = "";
    missionElement.innerHTML = "";
    const mission = await createJsonWords();
    createQuiz(mission);
}

handleClick(); /* 게임 시작 첫화면 글자 랜더링 */

$('button').addEventListener('click', handleClick);
window.addEventListener('keydown', handleKeydown);
